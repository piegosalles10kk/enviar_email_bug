const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController.js');

// Rota para enviar e-mail
router.post('/enviar-email', emailController.sendEmail);

module.exports = router;
