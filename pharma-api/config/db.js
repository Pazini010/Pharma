// pharma-api/config/db.js

const mysql = require("mysql2/promise"); // Importa o driver MySQL para Promises
// O '/promise' é importante para usar async/await
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Endereço do servidor MySQL
  user: process.env.DB_USER, // Usuário do MySQL
  password: process.env.DB_PASSWORD, // Senha do MySQL
  database: process.env.DB_DATABASE, // Nome do banco de dados
  waitForConnections: true, // Espera por conexões se o pool estiver cheio
  connectionLimit: 10, // Número máximo de conexões no pool
  queueLimit: 0, // Fila ilimitada para requisições de conexão
});

pool
  .getConnection()
  .then((connection) => {
    console.log("Coneção bem-sucedida com Mysql!");
    connection.release(); //Libera a conexão de volta para o pool
  })
  .catch((err) => {
    console.error("Erro ao conectar ao Mysql:", err.message);
    // Em produção, você pode querer sair do processo aqui: process.exit(1
  });

module.exports = pool;
