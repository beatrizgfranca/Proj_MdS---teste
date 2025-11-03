const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  // Verifica se o header existe e começa com "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw "Token não fornecido"
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Anexa os dados do usuário ao request para uso posterior
    req.user = decoded;

    next(); // segue para a próxima função/rota
  } catch (err) {
    return err;
  }
}

module.exports = authMiddleware;