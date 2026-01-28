// 1. Configurações essenciais
require('dotenv').config()
const express = require('express')
const app = express()

// 2. Importações de Rotas e DB
const db = require('./config/db')
const authRouter = require('./routes/authRoutes')
const funcionarioRouter = require('./routes/funcionarioRoutes')

// 3. Middlewares
app.use(express.json()) // Habilita o uso de JSON

// 4. Configuração da Porta
const PORT = process.env.PORT || 5000

// =============================================================
// FUNÇÃO DE INICIALIZAÇÃO (GARANTE QUE O DB ESTÁ ATIVO)
// =============================================================
async function startServer() {
    try {
        // TENTA SE CONECTAR AO MYSQL PRIMEIRO
        await db.getConnection();
        console.log('✅ Conexão bem-sucedida com o MySQL!');

        // 5. REGISTRAR ROTAS (SÓ SE O DB ESTIVER OK)
        app.use('/api', authRouter); // Login
        app.use('/api/funcionarios', funcionarioRouter); // Cadastros, Listagem, etc.

        // 6. Rota de teste simples
        app.get('/', (req, res) => {
            res.send(`API PharmaSys está rodando e conectada ao banco de dados!`);
        });

        // 7. INICIAR O SERVIDOR
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
            console.log(`Acesse: http://localhost:${PORT}`);
        });

    } catch (error) {
        // SE A CONEXÃO FALHAR, MOSTRA O ERRO DE CONEXÃO E NÃO INICIA O SERVIDOR
        console.error('❌ Erro ao conectar ao Mysql:', error.message);
        console.error('Não foi possível iniciar o servidor. Verifique suas credenciais no arquivo .env.');
        process.exit(1); // Sai do processo
    }
}

// Inicia a aplicação
startServer();