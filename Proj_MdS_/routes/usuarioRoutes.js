<<<<<<< HEAD:routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const authMiddleware = require('../middleware/auth');
const adiminMiddleware = require('../middleware/adimin');

// Registrar usuário comum
router.post('/registrar', UsuarioController.registrar);

// Login
router.post('/login', UsuarioController.login);

module.exports = router;
=======
const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const authMiddleware = require('../middleware/auth');
const adiminMiddleware = require('../middleware/adimin');

// Registrar usuário comum
router.post('/registrarUserComum', UsuarioController.registrarUserComum);

// Login
router.post('/login', UsuarioController.login);

// Registrar administrador (protege com middleware se quiser)
router.post('/registrarAdmin', authMiddleware, adiminMiddleware, UsuarioController.registrarAdimin);

module.exports = router;
>>>>>>> 932a183b58a75f044a419dcf0c9b8c10dd17341c:Proj_MdS_/routes/usuarioRoutes.js
