const express = require('express');
const router = express.Router();

// 🚨 REMOVA TODAS AS LINHAS DE IMPORTAÇÃO E CÓDIGO QUE NÃO ESTEJAM AQUI EMBAIXO, INCLUINDO { protect }
const funcionarioController = require('../controllers/funcionarioController'); 

// 1. Rota para CADASTRAR novos funcionários (POST /api/funcionarios)
router.post('/', funcionarioController.createFuncionario); 

// 2. Rota para LISTAR todos os funcionários (GET /api/funcionarios)
router.get('/', funcionarioController.getAllFuncionarios); 

// EXPORTAÇÃO ÚNICA: O Express PRECISA DESTA LINHA NO FINAL
module.exports = router;