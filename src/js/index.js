import $ from "jquery";
//import popper from "popper.js";
//import bootstrap from "bootstrap";
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
                // when window width is <= 320px
                    320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
            },
            navigation: {
                prevEl: $(elem).find('.str-prev'),
                nextEl: $(elem).find('.str-next'),
                disabledClass: 'str-disabled'
            },
        });
    });

    /* - - - Слайдер информации - - - */
    var elem = $('.info-block');

	new Swiper($(elem).find('.info-block__items'), {
		slidesPerView: 3,
		spaceBetween: 130,
		breakpoints: {
			// when window width is <= 320px
			320: {
                slidesPerView: 1,
                spaceBetween: 10
			},
		},
		navigation: {
			nextEl: $(elem).find('.str-next'),
			disabledClass: 'str-disabled'
		},
    });

    /* - - - Слайдер наши работы - - - */
    var elem = $('.our-work');

	new Swiper($(elem).find('.our-work__items'), {
		slidesPerView: 1,
		spaceBetween: 30,
        loop: true,
        loopAdditionalSlides: 1,
		breakpoints: {
			// when window width is <= 320px
			320: {
			slidesPerView: 1,
			spaceBetween: 10
			},
		},
		navigation: {
            prevEl: $(elem).find('.str-prev'),
            nextEl: $(elem).find('.str-next'),
		},
    });
});