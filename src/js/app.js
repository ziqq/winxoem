import '../libs/jquery-migrate.min';
import './lib/jquery.fancybox';
import '../libs/slick/slick';
import './lib/inputmask';
import './lib/svg-sprite';
import './partials/buttons';

$(document).ready(function() {
    if ($(window).width() >= 1024) {
        function paddingWrap() {
            $('.wrapper').css('padding-bottom', $('.footer').innerHeight());
        }
        paddingWrap();
        $(window).on('resize', paddingWrap);
    }

    //Modal Window
    //Modal FancyBox 3 https://fancyapps.com/fancybox/3/
    if ($('[data-fancybox]').length > 0) {
        $('[data-fancybox]').fancybox({
            touch: false,
            autoFocus: false,
            width: '100%',
            height: 'auto',
            margin: 0,
            padding: 0,
            closeSpeed: 0,
            helpers: {
                overlay: {
                    locked: false
                }
            }
        });
        $('[data-fancybox]').click(function() {
            var dataForm = $(this).data('form');
            var dataTitle = $(this).data('title');

            $('.form-order .wx-window__title').text(dataTitle);
            $('.form-order .admin-data').val(dataForm);
        });
    }

    // Masked Input
    if ($('.js-phone-mask').length > 0) {
        $('.js-phone-mask').inputmask({
            mask: '+7 (999) 999-99-99',
            clearIncomplete: true
        });
    }

    //Input Fpcus & Blur
    if ($('.js-input').length > 0) {
        $('.js-input')
            .find('input')
            .on('focus', function() {
                $(this)
                    .parent('.js-input')
                    .addClass('is-focus');
            })
            .on('blur', function() {
                if ($(this).val() === '') {
                    $(this)
                        .parent('.js-input')
                        .removeClass('is-focus');
                }
            });
    }

    if ($('.js-input--radio').length > 0) {
        $('.js-input--radio').on('click', function() {
            var _this = $(this);
            var input = $(this).find('input:radio');
            if (input.is(':checked')) {
                _this.addClass('is-checked');
            } else {
                $('.js-input--radio').removeClass('is-checked');
            }
        });
    }

    //slider
    //Slick Slider https://kenwheeler.github.io/slick/
    if ($('.js-wx-slider').length > 0) {
        $('.js-wx-slider').slick({
            nextArrow: '.wx-slider__arrow--next',
            prevArrow: '.wx-slider__arrow--prev',
            infinite: true,
            slidesToShow: 8,
            slidesToScroll: 1,
            speed: 1000,
            autoplaySpeed: 5000,
            autoplay: true,
            dots: false,
            responsive: [
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 6
                    }
                },
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 5
                    }
                },
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 376,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    $('.form-order').submit(function() {
        var th = $(this);
        $.ajax({
            type: 'POST',
            url: 'mail.php',
            data: th.serialize()
        }).done(function() {
            $('.form-order').addClass('is-success');
            setTimeout(function() {
                th.trigger('reset');
                $('.js-input')
                    .removeClass('is-focus')
                    .find('input')
                    .val('');
                $('.form-order').removeClass('is-success');
                $.fancybox.close();
            }, 3000);
        });
        return false;
    });
});
