const { Usuario } = require('../models/usuario');
const bcrypt = require('bcrypt');

// sistema de Registro
exports.registro = async (req, res) => {
  const { nome, telefone, email, password, Ningresso } = req.body;
  console.log('dados recebidos: ', {nome,telefone,email,password,Ningresso});
 

  try {
    const senhaCripto = await bcrypt.hash(password, 10);
    console.log('senha criptografada!');

    await Usuario.create({
      nome,
      telefone,
      email,
      password: senhaCripto,
      Ningresso
    });

    res.redirect('/');
  } catch (error) {
    console.error('erro no registro do usuario:', error);
    res.status(400).send('erro no registro do usuario.');
  }
};

// Sistema de Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Tentando fazer login com:', { email, password });

  try {
    const user = await Usuario.findOne({ where: { email } });
    console.log('Usuário encontrado:', user);

    if (user) {
      console.log('Senha no banco de dados:', user.password);
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        req.session.userId = user.id; 
        res.redirect('/queue'); 
      } else {
        res.status(400).send('Email ou senha incorretos.');
      }
    } else {
      res.status(400).send('Email ou senha incorretos.');
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).send('Erro ao fazer login.');
  }
};

//pega o perfil do usuario
exports.getProfile = async (req, res) => {
  const userId = req.session.userId;

  try {
    const user = await Usuario.findByPk(userId);
    if (user) {
      res.render('editarUser', { user });
    } else {
      res.status(404).send('Usuário não encontrado.');
    }
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário:', error);
    res.status(500).send('Erro ao buscar perfil do usuário.');
  }
};

//sistema de logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Erro ao sair.');
    }
    res.redirect('/'); 
  });
};

// atualiza perfil 
exports.updateProfile = async (req, res) => {
  const userId = req.session.userId;
  const { nome, telefone, password, Ningresso } = req.body;

  try {
    const user = await Usuario.findByPk(userId);
    if (user) {
      user.nome = nome;
      user.telefone = telefone;
      user.Ningresso = Ningresso;

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }

      await user.save();
      res.redirect('/queue');
    } else {
      res.status(404).send('Usuário não encontrado.');
    }
  } catch (error) {
    console.error('Erro ao atualizar perfil do usuário:', error);
    res.status(500).send('Erro ao atualizar perfil do usuário.');
  }
};