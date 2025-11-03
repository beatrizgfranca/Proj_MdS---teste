const Usuario = require('../models/Usuario');

async function adimin(req, res, next) {
  try {
    const userId = req.user.id;

    const user = await Usuario.findByPk(userId);

    if (!user) {
      throw "Usuário não encontrado";
    }

    if (!user.admin) {
      throw "Acesso negado: apenas administradores"
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}

module.exports = adimin;