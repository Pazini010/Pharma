const db = require('../config/db');
const bcrypt = require('bcryptjs');

// 1. Função para cadastrar um novo funcionário (POST)
async function createFuncionario(req, res) {
  
  const { ni, nome, cargo, password, id_filial } = req.body;

  if(!ni || !nome || !cargo || !password) {
    return res.status(400).json({ success: false, message: 'Todos os campos devem ser preenchidos.'});
  }

  let connection;
  try {
    connection = await db.getConnection();

    // Criptografia
    const salt = await bcrypt.genSalt(10);
    const senha_hash = await bcrypt.hash(password, salt);

    // Comando SQL CORRIGIDO
    const query =  `INSERT INTO Funcionarios (ni, nome, cargo, senha_hash, id_filial) VALUES (?,?,?,?,?)`;

    const [result] = await connection.execute(query, [ni, nome, cargo, senha_hash, id_filial || 1]);

    res.status(201).json({
      success: true,
      message: 'Funcionário cadastrado com sucesso!',
      id: result.insertId
    });

  } catch(error) {

    if (error.errno === 1062) {
      return res.status(400).json({ success: false, message: 'O NI informado já está em uso'});
    }

    console.error('Erro ao cadastrar funcionário:', error);
    res.status(500).json({ success: false, message: 'Erro interno ao cadastrar funcionário.'});

  } finally {
    if(connection) {
      connection.release();
    }
  }
}

// 2. Função para listar todos os funcionários (GET)
async function getAllFuncionarios(req, res) {
    let connection;
    try {
        connection = await db.getConnection();

        const query = `
            SELECT id, ni, nome, cargo, id_filial
            FROM Funcionarios
        `;
        const [rows] = await connection.execute(query);

        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });

    } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
        res.status(500).json({ success: false, message: 'Erro interno ao listar funcionários.' });
    } finally {
        if (connection) {
            connection.release();
        }
    }
}


// ÚNICA EXPORTAÇÃO no final do arquivo
module.exports = {
    createFuncionario,
    getAllFuncionarios 
};