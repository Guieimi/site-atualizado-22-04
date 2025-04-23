$(document).ready(function () {
    // Função para carregar o carrinho do localStorage
    function loadCart() {
        var storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
            cartItems = JSON.parse(storedCart); // Recupera o carrinho armazenado
        } else {
            cartItems = []; // Se não houver carrinho, inicializa um carrinho vazio
        }
        updateCart(); // Atualiza o carrinho na interface
    }

    // Função para salvar o carrinho no localStorage
    function saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Salva o carrinho no localStorage
    }

    // Variável para armazenar os itens do carrinho
    var cartItems = [];

    // Função para atualizar o carrinho no painel lateral
    function updateCart() {
        var cartTotal = 0;
        $('#cart-items').empty(); // Limpar itens do carrinho

        // Adicionar cada item ao carrinho
        cartItems.forEach(function (item, index) {
            $('#cart-items').append(
                `<li>
                    <span>${item.name} - R$${item.price.toFixed(2)}</span>
                    <span>Quantidade: ${item.quantity}</span>
                    <span>R$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item-btn" data-index="${index}">Excluir</button>
                    <button class="decrease-item-btn" data-index="${index}">-</button> <!-- Diminuir quantidade -->
                    <button class="increase-item-btn" data-index="${index}">+</button> <!-- Aumentar quantidade -->
                </li>`
            );
            cartTotal += item.price * item.quantity; // Atualizar o total
        });

        // Atualizar o total no painel
        $('#cart-total').text(`Total: R$${cartTotal.toFixed(2)}`);

        // Exibir o carrinho se houver itens
        if (cartItems.length > 0) {
            $('#cart').show();
        } else {
            $('#cart').hide();
        }

        // Atualizar a contagem de itens no ícone do carrinho
        $('#cart-count').text(cartItems.length); // Atualizar número de itens
        $('#cart-count').show(); // Exibir a contagem
    }

    // Evento de clique no botão "Adicionar ao Carrinho"
    $('.btn-default').on('click', function () {
        var productName = $(this).data('name');
        var productPrice = parseFloat($(this).data('price'));

        // Verificar se o item já existe no carrinho
        var existingItem = cartItems.find(item => item.name === productName);

        if (existingItem) {
            // Se o item já existir, aumentar a quantidade
            existingItem.quantity += 1;
        } else {
            // Se o item não existir, adicionar ao carrinho
            cartItems.push({ name: productName, price: productPrice, quantity: 1 });
        }

        // Salvar o carrinho no localStorage
        saveCart();

        // Atualizar o carrinho
        updateCart();
    });

    // Exibir ou esconder o carrinho ao clicar no ícone do carrinho
    $('#cart-icon').on('click', function () {
        $('#cart').toggle(); // Exibe ou esconde o carrinho ao clicar no ícone
    });

    // Função de finalização de compra
    window.checkout = function() {
        alert("Finalizando a compra...");
        // Aqui você pode adicionar a lógica para finalização de compra, redirecionamento, etc.
    };

    // Função para remover um item do carrinho
    $(document).on('click', '.remove-item-btn', function() {
        var index = $(this).data('index');
        cartItems.splice(index, 1); // Remover o item pelo índice
        saveCart(); // Salvar novamente no localStorage
        updateCart(); // Atualizar o carrinho
    });

    // Função para diminuir a quantidade de um item no carrinho
    $(document).on('click', '.decrease-item-btn', function() {
        var index = $(this).data('index');
        var item = cartItems[index];

        if (item.quantity > 1) {
            item.quantity -= 1;  // Diminuir a quantidade
        } else {
            // Se a quantidade for 1, removemos o item
            cartItems.splice(index, 1);
        }

        saveCart(); // Salvar novamente no localStorage
        updateCart(); // Atualizar o carrinho
    });

    // Função para aumentar a quantidade de um item no carrinho
    $(document).on('click', '.increase-item-btn', function() {
        var index = $(this).data('index');
        var item = cartItems[index];

        item.quantity += 1; // Aumentar a quantidade
        saveCart(); // Salvar novamente no localStorage
        updateCart(); // Atualizar o carrinho
    });

    // Função para limpar o carrinho
    $('#clear-cart-btn').on('click', function () {
        cartItems = []; // Limpa todos os itens
        saveCart(); // Salvar novamente no localStorage
        updateCart(); // Atualizar o carrinho
    });

    // Carregar o carrinho do localStorage ao iniciar
    loadCart();

    // Esconder o carrinho inicialmente
    $('#cart').hide();
});
