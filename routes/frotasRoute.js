const express = require('express');
const FrotasController = require('../controllers/FrotasController')
const AuthMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

let ctrl = new FrotasController();
let auth = new AuthMiddleware();
router.get('/', auth.validar, ctrl.listasFrotas);
router.post('/', auth.validar, ctrl.listarFrotasComDatasEspecificas);

// alterar
router.get('/alterar/:id', auth.validar, ctrl.alterarFrotaView);
router.post('/alterar', auth.validar, ctrl.alterarFrota);
router.post('/excluir', auth.validar, ctrl.excluirFrota);
module.exports = router;    