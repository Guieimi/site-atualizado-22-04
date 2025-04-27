<?php
session_start();

// Verificando se o carrinho já existe na sessão
if (!isset($_SESSION['carrinho'])) {
    $_SESSION['carrinho'] = [];
}

// Adicionando um produto ao carrinho
if (isset($_POST['produto_id'])) {
    $produto_id = $_POST['produto_id'];
    $quantidade = $_POST['quantidade'];

    // Adicionando ao carrinho (simplesmente um array de IDs)
    $_SESSION['carrinho'][] = ['produto_id' => $produto_id, 'quantidade' => $quantidade];
}

// Exibindo os itens do carrinho
echo "<h3>Carrinho de Compras</h3>";
foreach ($_SESSION['carrinho'] as $item) {
    echo "Produto ID: " . $item['produto_id'] . " - Quantidade: " . $item['quantidade'] . "<br>";
}
?>
<form method="post" action="checkout.php">
    <button type="submit">Finalizar Compra</button>
</form>
