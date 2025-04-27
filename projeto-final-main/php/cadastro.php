<?php
include('db.php');  // Conexão com o banco

// Verificando se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $telefone = $_POST['telefone'];
    $endereco = $_POST['endereco'];

    // Validando os dados
    if (empty($nome) || empty($email) || empty($senha) || empty($telefone) || empty($endereco)) {
        echo "Todos os campos devem ser preenchidos!";
        exit;
    }

    // Criptografando a senha
    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

    // Inserindo os dados no banco de dados
    $sql = "INSERT INTO Usuarios (Nome, Email, Senha, Telefone, Endereco) 
            VALUES ('$nome', '$email', '$senha_hash', '$telefone', '$endereco')";

    if ($conn->query($sql) === TRUE) {
        echo "Cadastro realizado com sucesso!";
    } else {
        echo "Erro: " . $sql . "<br>" . $conn->error;
    }
}
?>

<!-- Formulário de Cadastro -->
<form method="post" action="cadastro.php">
    Nome: <input type="text" name="nome" required><br>
    E-mail: <input type="email" name="email" required><br>
    Senha: <input type="password" name="senha" required><br>
    Telefone: <input type="text" name="telefone" required><br>
    Endereço: <input type="text" name="endereco" required><br>
    <button type="submit">Cadastrar</button>
</form>
