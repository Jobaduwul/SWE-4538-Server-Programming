const express = require('express');
const { apiKeyMiddleware, logRequestMiddleware } = require('./middleware');
const routes = require('./routes');

const app = express();
const port = 3000;

app.use(logRequestMiddleware);

app.use(apiKeyMiddleware);

app.use('/', routes);

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});