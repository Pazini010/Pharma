const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Certifique-se de que está instalado: npm install jsonwebtoken

// Função auxiliar para gerar o token JWT
const generateToken = (id) => {
    // A chave secreta deve estar no seu arquivo .env
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d', // Expira em 1 dia
    });
};

// 1. Rota de Login
async function login(req, res) {
    const { ni, password } = req.body;

    let connection;
    try {
        connection = await db.getConnection();

        // 1. Busca o funcionário pelo NI
        const query = 'SELECT * FROM Funcionarios WHERE ni = ?';
        const [rows] = await connection.execute(query, [ni]);

        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'NI ou senha inválidos.' });
        }

        const funcionario = rows[0];

        // 2. Compara a senha (plaintext) com o hash no DB
        const isMatch = await bcrypt.compare(password, funcionario.senha_hash);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'NI ou senha inválidos.' });
        }

        // 3. Sucesso: Gera o Token e retorna
        res.status(200).json({
            success: true,
            message: 'Login bem-sucedido!',
            token: generateToken(funcionario.id),
            funcionario: {
                id: funcionario.id,
                ni: funcionario.ni,
                nome: funcionario.nome,
                cargo: funcionario.cargo
            }
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
    } finally {
        if (connection) {
            connection.release();
        }
    }
}


module.exports = {
    login // Exporta apenas o necessário para o authRoutes
};