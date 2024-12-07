const express = require('express');
const IndexController = require('../controllers/IndexController');
const AuthMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

let ctrl = new IndexController();
let auth = new AuthMiddleware();
router.get('/', auth.validar,ctrl.indexView);

// PERFIL
router.get('/perfil', auth.validar, ctrl.perfilView);
router.get('/perfil/alterar/:id', auth.validar, ctrl.perfilViewAlterar);
router.post('/perfil/alterar/', auth.validar, ctrl.perfilAlterar);

// PERFIL -> SENHA
router.get('/perfil/alterar/senha/:id', auth.validar, ctrl.senhaView);
router.post('/perfil/alterar/senha/', auth.validar, ctrl.senha);

module.exports = router;