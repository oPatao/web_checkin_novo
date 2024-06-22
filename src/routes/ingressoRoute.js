const express = require('express');
const router = express.Router();
const ingressoController = require('../controllers/ingressoController');


function estaAutenticado(req, res, next) { //autenticacao de que ss, esta logado
    if (req.session.userId) {
    next();
  } else {
      res.redirect('/login');
  }
}

function eAdm(req,res,next) {
    if (req.session.userId == 1) {
      next()
  
    } else {
      res.redirect('/queue');
    }
  }


// Rotas para CRUD de produtos
router.get('/ingressos', estaAutenticado, ingressoController.listaIngresso);
router.get('/ingressos/add', estaAutenticado, ingressoController.showAddIngressoForm);
router.post('/ingressos/add', estaAutenticado, ingressoController.addIngresso);
router.get('/ingressos/edit/:id',estaAutenticado, ingressoController.showEditIngressoForm);
router.post('/ingressos/edit/:id', estaAutenticado, ingressoController.updateIngresso);
router.post('/ingressos/delete/:id', estaAutenticado, ingressoController.deleteIngresso);

module.exports = router;