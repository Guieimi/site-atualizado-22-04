const express = require('express');
const sql = require('mssql');
require('dotenv').config();  // Carregar variáveis de ambiente do arquivo .env

const app = express();
const port = 3000;  // Definindo a porta para o servidor

// Configuração de conexão com o SQL Server
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, 
    trustServerCertificate: true
  }
};

// Middleware para processar o corpo das requisições
app.use(express.json()); // Para lidar com JSON no corpo da requisição
app.use(express.urlencoded({ extended: true })); // Para lidar com dados de formulários

// Servir arquivos estáticos (HTML, CSS, JS) da raiz do projeto
app.use(express.static(__dirname));

// Conectar ao banco de dados
sql.connect(config).then(pool => {
  console.log('Conectado ao banco de dados');

  // Rota de Cadastro
  app.post('/cadastro', async (req, res) => {
    const { nome, email, senha, telefone, endereco } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).send('Campos obrigatórios: nome, email, senha');
    }

    try {
      // Realiza a inserção do usuário no banco de dados
      await pool.request()
        .input('nome', sql.NVarChar, nome)
        .input('email', sql.NVarChar, email)
        .input('senha', sql.NVarChar, senha)  // Deixe a senha sem criptografar aqui por enquanto
        .input('telefone', sql.NVarChar, telefone)
        .input('endereco', sql.NVarChar, endereco)
        .query(`
          INSERT INTO Usuarios (Nome, Email, Senha, Telefone, Endereco)
          VALUES (@nome, @email, @senha, @telefone, @endereco)
        `);
      
      res.status(201).send('Usuário cadastrado com sucesso!');
    } catch (err) {
      console.error('Erro ao cadastrar usuário:', err);
      res.status(500).send('Erro ao cadastrar usuário');
    }
  });

  // Rota de Admin - Ver todos os usuários
  app.get('/admin/usuarios', async (req, res) => {
    try {
      const result = await pool.request().query('SELECT * FROM Usuarios');
      res.json(result.recordset);  // Exibe os usuários cadastrados
    } catch (err) {
      console.error('Erro ao consultar usuários:', err);
      res.status(500).send('Erro no servidor');
    }
  });

  // Iniciar o servidor
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Erro de conexão:', err);
});
