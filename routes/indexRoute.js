const express = require('express');
const IndexController = require('../controllers/IndexController');
const AuthMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

let ctrl = new IndexController();
let auth = new AuthMiddleware();
router.get('/', auth.validar,ctrl.indexView);

module.exports = router;