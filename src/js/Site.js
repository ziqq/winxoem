/**
 * Site.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */

import 'slick-carousel';
// import 'bootstrap/js/dist/util';
// import 'bootstrap/js/dist/modal';
import '@fancyapps/fancybox';
import Inputmask from 'inputmask';
import { CheckBox, Radio } from '@/js/components/CheckBox';
import LiquidBtn from '@/js/components/LiquidBtn';

const $window = $(window);
const $wrapper = $('.wrapper');

export default class Site {
    init() {
        this.initPopup();
        this.initMask();
        this.initCheckBox();
        this.initLiquidBtn();
        this.initSlider();
        this.initInputHoverEffect();
        this.generateOffsetBottom();
        this.onSubmitForm();
    }

    generateOffsetBottom() {
        if ($window.width() >= 1024) {
            function paddingWrap() {
                $wrapper.css('padding-bottom', $('.footer').innerHeight());
            }
            paddingWrap();
            $window.on('resize', paddingWrap);
        }
    }

    initPopup() {
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
                        locked: false,
                    },
                },
            });
            $('[data-fancybox]').click(function() {
                let dataForm = $(this).data('form');
                let dataTitle = $(this).data('title');

                $('.form-order .wx-window__title').text(dataTitle);
                $('.form-order .admin-data').val(dataForm);
            });
        }
    }

    //Masked inputmask https://github.com/RobinHerbots/Inputmask
    initMask() {
        const phoneMask = new Inputmask('+7 (999) 999-99-99');
        const inputPhone = document.querySelectorAll('.js-phone-mask');

        if (inputPhone) {
            for (let i = 0; i < inputPhone.length; i++) {
                phoneMask.mask(inputPhone[i]);
            }
        }
    }

    initInputHoverEffect() {
        const $input = $('.js-input');
        //Input Fpcus & Blur
        if ($input.length) {
            $input
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
    }

    initCheckBox() {
        new CheckBox({ selector: '.js-checkbox' }).init();
        new Radio({ selector: '.js-radio' });
    }

    initLiquidBtn() {
        const btn = '.js-liquid-btn';
        if ($(btn).length > 0 && $window.width() > 480) {
            new LiquidBtn(btn);
        }
    }

    initSlider() {
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
                            slidesToShow: 6,
                        },
                    },
                    {
                        breakpoint: 1025,
                        settings: {
                            slidesToShow: 5,
                        },
                    },
                    {
                        breakpoint: 769,
                        settings: {
                            slidesToShow: 3,
                        },
                    },
                    {
                        breakpoint: 481,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 376,
                        settings: {
                            slidesToShow: 1,
                        },
                    },
                ],
            });
        }
    }

    onSubmitForm() {
        const $frorm = $('.form-order');

        $frorm.on('submit', () => {
            let _this = $(this);

            $.ajax({
                type: 'POST',
                url: 'mail.php',
                data: _this.serialize(),
            }).done(function() {
                $frorm.addClass('is-success');

                setTimeout(() => {
                    _this.trigger('reset');

                    $('.js-input')
                        .removeClass('is-focus')
                        .find('input')
                        .val('');
                    $frorm.removeClass('is-success');
                    $.fancybox.close();
                }, 3000);
            });
            return false;
        });
    }
}
