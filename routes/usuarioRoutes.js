const express = require('express');
const UsuarioController = require('../controllers/UsuarioController')
const router = express.Router();
const authMiddleware = require('../middleware/auth')
const adiminMiddleware = require('../middleware/adimin')

router.post('/gerarQR', authMiddleware, UsuarioController.gerarQRCode)