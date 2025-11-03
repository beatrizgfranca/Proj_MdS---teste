const express = require('express');
const router = express.Router();
const MicrocontroladorController = require('../models/Microcontrolador');
const authMiddleware = require('../middleware/auth')
const adiminMiddleware = require('../middleware/adimin')

router.get('/listarMicrocontroladores', MicrocontroladorController.listAll)

router.post('/register', authMiddleware, adiminMiddleware, MicrocontroladorController.register);
router.delete('/delete', authMiddleware, adiminMiddleware, MicrocontroladorController.delete);