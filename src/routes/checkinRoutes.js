const express = require('express');
const router = express.Router();

const checkinController = require('../controllers/checkinController');
const loginController = require('../controllers/loginController');
const queueController = require('../controllers/queueController');
const ingressoController = require('../controllers/ingressoController');



function estaAutenticado(req, res, next) { //autenticacao de que ss, esta logado
    if (req.session.userId) {
    next();
  } else {
      res.redirect('/login');
  }
}

router.get('/', checkinController.indexView);
router.get('/registro', checkinController.telaRegistro);
router.post('/registro', loginController.registro);
router.get('/login', checkinController.telaLogin);
router.post('/login', loginController.login );

router.get('/queue', estaAutenticado, queueController.getQueue);

router.get('/editarUser', estaAutenticado, loginController.getProfile);
router.post('/editarUser', estaAutenticado, loginController.updateProfile);

router.get('/logout', estaAutenticado, loginController.logout);

router.get('/ingressos', estaAutenticado, ingressoController.listaIngresso);
router.get('/ingressos/add', estaAutenticado, ingressoController.showAddIngressoForm);
router.post('/ingressos/add', estaAutenticado, ingressoController.addIngresso);
router.get('/ingressos/edit/:id',estaAutenticado, ingressoController.showEditIngressoForm);
router.post('/ingressos/edit/:id', estaAutenticado, ingressoController.updateIngresso);
router.post('/ingressos/delete/:id', estaAutenticado, ingressoController.deleteIngresso);

module.exports = router;




module.exports = router;