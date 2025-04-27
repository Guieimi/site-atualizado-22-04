<?php
session_start();
include('db.php');  // Conexão com o banco

// Verificando se o carrinho está vazio
if (empty($_SESSION['carrinho'])) {
    echo "Carrinho vazio!";
    exit;
}

// Criando o pedido no banco de dados
$sql = "INSERT INTO Pedidos (Status) VALUES ('Pendente')";
if ($conn->query($sql) === TRUE) {
    $pedido_id = $conn->insert_id; // ID do pedido recém-criado

    // Adicionando os produtos do carrinho ao pedido
    foreach ($_SESSION['carrinho'] as $item) {
        $produto_id = $item['produto_id'];
        $quantidade = $item['quantidade'];
        $preco_total = $quantidade * 10; // Exemplo de preço, você deve usar o preço real do banco
        $sql = "INSERT INTO Pedidos (ProdutoID, Quantidade, PrecoTotal) 
                VALUES ('$produto_id', '$quantidade', '$preco_total')";
        $conn->query($sql);
    }

    echo "Compra finalizada com sucesso! Seu pedido foi registrado.";
    // Limpar o carrinho
    unset($_SESSION['carrinho']);
} else {
    echo "Erro ao criar o pedido: " . $conn->error;
}
?>
