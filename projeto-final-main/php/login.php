<?php
include('db.php');  // Conexão com o banco

// Verificando se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    // Consultando o banco de dados para verificar as credenciais
    $sql = "SELECT * FROM Usuarios WHERE Email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        // Verificando a senha criptografada
        if (password_verify($senha, $user['Senha'])) {
            echo "Bem-vindo, $email!";
            // Iniciar sessão ou redirecionar o usuário
            session_start();
            $_SESSION['user_id'] = $user['UsuarioID'];
            $_SESSION['user_email'] = $user['Email'];
            header("Location: index.php");  // Redireciona para a página inicial
        } else {
            echo "Credenciais inválidas!";
        }
    } else {
        echo "Credenciais inválidas!";
    }
}
?>

<!-- Formulário de Login -->
<form method="post" action="login.php">
    E-mail: <input type="email" name="email" required><br>
    Senha: <input type="password" name="senha" required><br>
    <button type="submit">Entrar</button>
</form>
