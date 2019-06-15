import $ from "jquery";
import bootstrap from "bootstrap";
import Swiper from 'swiper';

window.jQuery = $;
window.$ = $;
require('@fancyapps/fancybox');

import './jquery.maskedinput.min.js';

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

    /* - - - Слайдер отзывы клиентов - - - */
    var elem = $('.review-block');

	new Swiper($(elem).find('.review-block__items'), {
		slidesPerView: 3,
		spaceBetween: 30,
		breakpoints: {
			767: {
                slidesPerView: 2,
                spaceBetween: 20
			},
			575: {
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

    /* - - - Открытие главного меню - - - */
    $('.menu-top-btn').click(function(){

        $('.header-main').toggleClass('header-main_open');
    });

    /* - - - Ввод только чисел в input - - - */
	$('.only-number').keypress(function(event){

		event = event || window.event;

		if (event.charCode && event.charCode!=0 && event.charCode!=46 && (event.charCode < 48 || event.charCode > 57)) return false;
	});

    /* - - - Маска для телефона - - - */
	$(".phone-mask").mask("+7 ( 999 ) 999 99 99");

    /* - - - Прокрутка к элементу - - - */
	$(".scrool-to").click(function() {

        $('.header-main').removeClass('header-main_open');

		$('html, body').animate({

			scrollTop: $($(this).attr('href')).offset().top

		}, 1000);

		return false;
	});

    /* - - - Карта - - - */
    ymaps.ready(init);

    function init() {

        var myMap = new ymaps.Map("map", {
            center: [55.794760, 37.698771],
            zoom: 16,
            controls: []
        });

        var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
           // hintContent: 'Собственный значок метки',
           // balloonContent: 'Это красивая метка'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: '/local/img/map.point.svg',
            // Размеры метки.
            iconImageSize: [122, 124],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-63, -104]
        });

        myMap.geoObjects.add(myPlacemark);
    }

    /* - - - Подгрузка товаров - - - */
    $('body').delegate('#show-more', 'click', function(){

        $.ajax({
            url: '/ajax.html',
            success: function(html){

                var elem = $('#ajax-set-plase');

                var parentElem = $(elem).parent();

                $(elem).remove();

                $(parentElem).append(html);
            }
        });
    });
});