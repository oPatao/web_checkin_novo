const { Ingresso } = require('../models/usuario');

// lita os produtos
exports.listaIngresso = async (req, res) => {
  try {
    const ingressos = await Ingresso.findAll();
    res.render('ingressos', { ingressos });
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).send('Erro ao listar produtos.');
  }
};

// mostra add ingresso
exports.showAddIngressoForm = (req, res) => {
  res.render('addIngresso');
};

// add ingresso
exports.addIngresso = async (req, res) => {
  const { nome, descricao, preco, estoque } = req.body;
  try {
    await Ingresso.create({ nome, descricao, preco, estoque });
    res.redirect('/ingressos');
  } catch (error) {
    console.error('Erro ao adicionar ingresso:', error);
    res.status(500).send('Erro ao adicionar produto.');
  }
};

// form de edicao
exports.showEditIngressoForm = async (req, res) => {
  const ingressoId = req.params.id;
  try {
    const ingresso = await Ingresso.findByPk(ingressoId);
    if (ingresso) {
      res.render('editIngresso', { Ingresso });
    } else {
      res.status(404).send('Ingresso não encontrado.');
    }
  } catch (error) {
    console.error('Erro ao buscar ingresso:', error);
    res.status(500).send('Erro ao buscar produto.');
  }
};

// att um produto
exports.updateIngresso = async (req, res) => {
  const ingressoId = req.params.id;
  const { nome, descricao, preco, estoque } = req.body;
  try {
    const ingresso = await Ingresso.findByPk(ingressoId);
    if (ingresso) {
      ingresso.nome = nome;
      ingresso.descricao = descricao;
      ingresso.preco = preco;
      ingresso.estoque = estoque;
      await ingresso.save();
      res.redirect('/ingressos');
    } else {
      res.status(404).send('Ingresso não encontrado.');
    }
  } catch (error) {
    console.error('Erro ao atualizar ingresso:', error);
    res.status(500).send('Erro ao atualizar ingresso.');
  }
};

// exclui 
exports.deleteIngresso = async (req, res) => {
  const ingressoId = req.params.id;
  try {
    const ingresso = await Ingresso.findByPk(ingressoId);
    if (ingresso) {
      await ingresso.destroy();
      res.redirect('/ingressos');
    } else {
      res.status(404).send('Ingresso não encontrado.');
    }
  } catch (error) {
    console.error('Erro ao excluir Ingresso:', error);
    res.status(500).send('Erro ao excluir produto.');
  }
};