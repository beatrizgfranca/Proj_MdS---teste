const express = require('express');
const router = express.Router();
const MicrocontroladorController = require('../models/Microcontrolador');
const authMiddleware = require('../middleware/auth')
const adiminMiddleware = require('../middleware/adimin')

router.post('/register', authMiddleware, adiminMiddleware, MicrocontroladorController.register)