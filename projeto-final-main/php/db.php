<?php
require_once 'vendor/autoload.php';  // Carrega o autoload do Composer

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();  // Carrega as variáveis do .env

// Conexão com o banco de dados usando as variáveis do .env
$servername = getenv('DB_HOST');  
$username = getenv('DB_USER');
$password = getenv('DB_PASSWORD');
$dbname = getenv('DB_NAME');

// Criando a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificando a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>
