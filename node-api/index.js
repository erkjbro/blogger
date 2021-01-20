const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.json());

app.get('/api', (req, res, next) => {
  res.json({ message: 'blog api reached!'});
});

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`)
});
