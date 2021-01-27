import express from 'express';
import mongoose from 'mongoose';

import blogRoutes from './routes/blogs.js';
import userRoutes from './routes/users.js';
import HttpError from './models/http-error.js';

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
  throw new HttpError(err, 503);
}

app.use(express.json());

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

app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Sorry, I don\'t seem to have that route...', 404);
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
