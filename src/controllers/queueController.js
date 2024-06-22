const { Usuario } = require('../models/usuario');

// funcao placeholder para calcular posicao da fila
function calcularPosicaoFila(userId) {

  return {
    posicao: 1, 
    queueTime: '10 minutos'
  };
}

exports.getQueue = async (req, res) => {
  const userId = req.session.userId;
  
  try {
    const user = await Usuario.findByPk(userId);
    if (user) {
      const queueData = calcularPosicaoFila(userId);
      res.render('queue', {
        nome: user.nome,
        posicao: queueData.posicao,
        queueTime: queueData.queueTime,
      });
    } else {
      res.status(404).send('Usuário não encontrado.');
    }
  } catch (error) {
    console.error('Erro ao obter fila:', error);
    res.status(500).send('Erro ao obter fila.');
  }
};