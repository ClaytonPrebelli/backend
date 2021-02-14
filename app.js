const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const rotaColaboradores = require('./routes/colaboradores');

app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, application/x-www-form-urlencoded, Content-Length, Host, User-Agent Accept,Accept-Encoding, Connection, Authorization');
  if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
   }
    next();
});

app.use('/colaborador', (rotaColaboradores))

//tratamento de erro de rota
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });

});

module.exports = app;