import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';

const PORT = Number(process.env.PORT) || 5000;

const app = express();

try {
  await mongoose.connect(
    process.env.DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
} catch (err) {
  const error = new Error(err);
  error.statusCode = 503;
  throw error;
}

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'http://localhost:3000'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

// Routes Go Here

app.use((req, res, next) => {
  const error = new Error('Sorry, I don\'t seem to have that route...');
  error.statusCode = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const { stack, statusCode, message, data } = err;
  console.error(stack);

  if (res.headersSent) {
    return next(err);
  }

  res.status(statusCode || 500).json({
    message: message || 'Something broke on our side!',
    data: data || null
  });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`)
});
