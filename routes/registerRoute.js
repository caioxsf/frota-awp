const express = require('express');
const RegisterController = require('../controllers/RegisterController')
const router = express.Router();

let ctrl = new RegisterController();
router.get('/', ctrl.registerView);
router.post('/',ctrl.register);
module.exports = router;