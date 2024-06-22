const Usuario = require('../models/usuario');
const { login } = require('./loginController');
const queueController = require('../controllers/queueController');



function indexView(req, res){ //renderiza a index/pagina inicial
    res.render('index.html');
}


function telaRegistro(req, res){
    res.render('registro.html'); //rederiza a pagina de registro

}
function telaLogin(req, res){
    res.render('login.html'); //renderiza a pagina de login
}






module.exports = {
    indexView,
    telaRegistro,
    telaLogin
}