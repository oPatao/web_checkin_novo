const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const { sequelize } = require('./src/models/usuario');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');


app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/src/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({
  secret: 'minhaChaveExtremamenteSecreta123!@#', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use('/', require('./src/routes/checkinRoutes'));



const PORT = 8080;
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados foi estabelecida com sucesso.');
      } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
      }
      console.log(`Servidor rodando em http://localhost:${PORT}`);
});