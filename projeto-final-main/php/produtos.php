<?php
include('db.php');  // Conexão com o banco

// Consultando os produtos no banco de dados
$sql = "SELECT * FROM Produtos";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<div class='produto'>";
        echo "<h3>" . $row['Nome'] . "</h3>";
        echo "<p>Preço: R$ " . $row['Preco'] . "</p>";
        echo "<p>Descrição: " . $row['Descricao'] . "</p>";
        echo "<form method='post' action='carrinho.php'>
                <input type='hidden' name='produto_id' value='" . $row['ProdutoID'] . "'>
                <input type='number' name='quantidade' value='1' min='1'>
                <button type='submit'>Adicionar ao Carrinho</button>
              </form>";
        echo "</div>";
    }
} else {
    echo "Nenhum produto encontrado.";
}
?>
