const express = require('express');
const CadastroFrotaController = require('../controllers/CadastroFrotaController');
const AuthMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

let ctrl = new CadastroFrotaController();
let auth = new AuthMiddleware();
router.get('/', auth.validar, ctrl.cadastroFrotaView);
router.post('/', auth.validar, ctrl.cadastroFrota);

module.exports = router;