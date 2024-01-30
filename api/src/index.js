const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// eslint-disable-next-line no-unused-vars
const expressAsyncErrors = require('express-async-errors');
const routes = require('./routes');

const app = express();

app.set('view engine', 'ejs');
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use(routes);

// Error Handler --> middleware do express para tratamento de erros
app.use((error, request, response, next) => {
  console.log('### Error Handler ###');
  console.log(error);
  response.sendStatus(500);
});

/* const httpsServer = https.createServer(app);

httpsServer.listen(443, () => {
  console.log('Server started at https https://testeapi.precsys.app.br/');
});
 */

app.listen(3000, () => console.log('Server started at http://localhost:3000'));
