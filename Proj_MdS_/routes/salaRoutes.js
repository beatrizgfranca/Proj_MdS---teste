<<<<<<< HEAD:routes/salaRoutes.js
const express = require('express');
const SalaController = require('../controllers/SalaControllers')
const router = express.Router();
const authMiddleware = require('../middleware/auth')
const adiminMiddleware = require('../middleware/adimin')

router.get('/listarSalas', SalaController.listarSalas);
router.get('/gerarQRCodes', authMiddleware, adiminMiddleware, SalaController.gerarQRCodesPDF);
router.post('/registrarSala', authMiddleware, adiminMiddleware, SalaController.registrarSala);

=======
const express = require('express');
const SalaController = require('../controllers/SalaControllers')
const router = express.Router();
const authMiddleware = require('../middleware/auth')
const adiminMiddleware = require('../middleware/adimin')

router.get('/listarSalas', SalaController.listarSalas);
router.get('/gerarQRCodes', authMiddleware, adiminMiddleware, SalaController.gerarQRCodesPDF);
router.post('/registrarSala', authMiddleware, adiminMiddleware, Sala.registrarSala);

>>>>>>> 932a183b58a75f044a419dcf0c9b8c10dd17341c:Proj_MdS_/routes/salaRoutes.js
module.exports = router;