const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// eslint-disable-next-line no-unused-vars
const expressAsyncErrors = require('express-async-errors');
const routes = require('./routes');

const app = express();

// const allowedOrigins = ['https://precsys2.vercel.app', 'https://dc52f968-3718-41d0-ac25-fe71659c3cac-00-28j7vjdkqe4xr.kirk.replit.dev/', 'http://localhost:3000/'];
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(express.json());

app.use(cookieParser());

app.use(routes);

// Error Handler --> middleware do express para tratamento de erros
app.use((error, request, response, next) => {
  console.log('### Error Handler ###');
  console.log(error);
  response.sendStatus(500);
});

app.listen(3000, () => console.log('Server started at http://localhost:3000'));

module.exports = app;
