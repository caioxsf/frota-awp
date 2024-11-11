const express = require('express');
const LoginController = require('../controllers/LoginController')
const router = express.Router();

let ctrl = new LoginController();
router.get('/', ctrl.loginView);
router.get("/logout", ctrl.logout);
router.post('/', ctrl.login)
module.exports = router;