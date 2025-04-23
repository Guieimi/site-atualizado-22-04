$(document).ready(function () {
    // Função para alternar o menu no mobile
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    // Manipulação das seções e navegação ativa
    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        // Adicionando sombra ao cabeçalho
        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1)');
        }

        // Navegação ativa com base na posição do scroll
        sections.each(function (i) {
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop + section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navItems.removeClass('active');
                navItems.eq(i).addClass('active');
                return false;
            }
        });
    });

    // Manipulação das categorias
    $('.categorias ul li').on('click', function () {
        $('.categorias ul li').removeClass('active');
        $(this).addClass('active');
    });

    // Marcação do link ativo com base no URL atual
    var currentUrl = window.location.href;
    $('.categorias ul li a').each(function () {
        if (this.href === currentUrl) {
            $(this).parent().addClass('active');
        }
    });

    // Chama a função de rolagem reveladora para animações
    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.dish', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#testimonial_chef', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    });

    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    });
});
