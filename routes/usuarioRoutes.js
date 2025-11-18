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
