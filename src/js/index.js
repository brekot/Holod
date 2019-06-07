import $ from "jquery";
//import popper from "popper.js";
import bootstrap from "bootstrap";
import Swiper from 'swiper';

window.jQuery = $;
window.$ = $;
require('@fancyapps/fancybox');

$(function() {

    /* - - - Подключение fancybox - - - */
    $('[data-fancybox]').fancybox({
        buttons: [
            "zoom",
            //"share",
            "slideShow",
            "fullScreen",
            //"download",
            //"thumbs",
            "close"
        ],
    });

    /* - - - Слайдер товаров - - - */
    $('.catalog-slider').each(function(){

        var elem = $(this);

        new Swiper($(elem).find('.swiper-container'), {
            slidesPerView: 3,
            spaceBetween: 30,
            breakpoints: {
                1349: {
                    slidesPerView: 2
                },
                767: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
            },
            navigation: {
                prevEl: $(elem).find('.str-prev'),
                nextEl: $(elem).find('.str-next'),
                disabledClass: 'str-disabled'
            },
        });
    });

    /* - - - Слайдер наши работы - - - */
    var elem = $('.our-work');

	new Swiper($(elem).find('.our-work__items'), {
		slidesPerView: 1,
		spaceBetween: 30,
        loop: true,
        loopAdditionalSlides: 1,
		breakpoints: {
			320: {
                slidesPerView: 1,
                spaceBetween: 20
			},
		},
		navigation: {
            prevEl: $(elem).find('.str-prev'),
            nextEl: $(elem).find('.str-next'),
		},
    });

    $('.menu-top-btn').click(function(){

        $('.header-main').toggleClass('header-main_open');
    });
});