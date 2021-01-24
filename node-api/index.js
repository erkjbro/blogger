import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';

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
  throw new Error(err);
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

app.get('/api', (req, res, next) => {
  res.json({ message: 'blog api reached!'});
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Sorry, I don\'t have that...' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`)
});
