const { Sequelize, DataTypes } = require('sequelize');
//const sequelize = new Sequelize('sqlite::memory:');

// conecta ao banco
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

// Definição Usuário
const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Ningresso: {
    type: DataTypes.STRING,
    allowNull: false
  }
  
});

const Ingresso = sequelize.define('Ingresso', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  estoque: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});



// Sincronizar os modelos com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Sincronização do banco de dados concluída.');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });


module.exports = {
  Usuario,
  Ingresso,
  sequelize
};