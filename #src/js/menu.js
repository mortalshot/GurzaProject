$(document).ready(function () {
    $('.header__burger').click(function (event) {
        $('.header__burger, .header__menu').toggleClass('active');
        $('body').toggleClass('lock');
    })

    // Go To
    $(".menu").on("click", ".menu__link", function (event) {
        if (!$(this).hasClass('popup-link')) {
            event.preventDefault();
            var id = $(this).attr('href');
            var top = $(id).offset().top;
            $('.header__burger').removeClass('active');
            $('.header__menu').removeClass('active');
            $('body').removeClass('lock');
            $('body,html').animate({ scrollTop: top }, 1000);
        }
    });
})