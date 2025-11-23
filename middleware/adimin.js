<<<<<<< HEAD:middleware/adimin.js
const Usuario = require('../models/Usuario');

async function isAdmin(req, res, next) {
  try {
    const userId = req.user.id;

    const user = await Usuario.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (!user.admin) {
      return res.status(403).json({ error: "Acesso negado: apenas administradores" });
    }

    // Se passou nas verificações, segue para a próxima rota
    next();
  } catch (err) {
    console.error("Erro no middleware isAdmin:", err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}

module.exports = isAdmin;
=======
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
>>>>>>> 932a183b58a75f044a419dcf0c9b8c10dd17341c:Proj_MdS_/middleware/adimin.js
