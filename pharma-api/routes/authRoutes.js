const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController'); 

// Rota de Login: POST /api/login
router.post('/login', authController.login);

// EXPORTAÇÃO ÚNICA
module.exports = router;