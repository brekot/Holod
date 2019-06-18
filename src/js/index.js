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

/* - - - Снег - - - */
import './pixi.min.js';

$(function(){

    if ($('.info-block').length > 0)
    {
        const UPPER_LIMIT_Y = 20
        const UPPER_LIMIT_X = 2
        const LOWER_LIMIT_X = -2
        const MAX_SIZE = 6
        const MIN_SIZE = 2
        const AMOUNT = 250
        const COLOR = 0xffffff
        const { Application, Graphics } = PIXI
        const floored = v => Math.floor(Math.random() * v)
        const update = p =>
          Math.random() > 0.5
            ? Math.max(LOWER_LIMIT_X, p - 1)
            : Math.min(p + 1, UPPER_LIMIT_X)

        const reset = p => {
            p.x = floored(app.renderer.width)
            p.y = -(p.height + floored(app.renderer.height))
            p.vy = floored(UPPER_LIMIT_Y)
        }

        const genParticles = t =>
          new Array(AMOUNT).fill().map(p => {
            const SIZE = floored(MAX_SIZE) + MIN_SIZE
            p = new PIXI.Sprite(t)
            p.scale.x = p.scale.y = SIZE / 100
            // p.width = p.height = SIZE
            p.vx = floored(UPPER_LIMIT_X) - UPPER_LIMIT_X
            p.vy = floored(UPPER_LIMIT_Y)
            p.alpha = Math.random()
            p.x = floored(app.renderer.width)
            p.y = -(SIZE + floored(app.renderer.height))
            drops.addChild(p)
            return p
        })

        const app = new Application({
          antialias: true,
          transparent: true,
        })

        const drops = new PIXI.particles.ParticleContainer(AMOUNT, {
          scale: true,
          position: true,
          alpha: true,
        })

        app.stage.addChild(drops)

        const p = new Graphics()
        p.beginFill(COLOR)
        p.drawCircle(0, 0, 100)
        p.endFill()
        const baseTexture = app.renderer.generateTexture(p)
        let particles = genParticles(baseTexture)

        app.ticker.add(i => {
          if (
            app.renderer.height !== innerHeight ||
            app.renderer.width !== innerWidth
          ) {
            app.renderer.resize(innerWidth, innerHeight)
            drops.removeChildren()
            particles = genParticles(baseTexture)
          }
          for (let particle of particles) {
            if (particle.y > 0) particle.x += particle.vx
            particle.y += particle.vy

            if (Math.random() > 0.9) particle.vx = update(particle.vx)
            if (Math.random() > 0.9)
              particle.vy = Math.min(particle.vy + 1, UPPER_LIMIT_Y)

            if (
              particle.x > app.renderer.width ||
              particle.x < 0 ||
              particle.y > app.renderer.height
            )
              reset(particle)
          }
        });

        $('.info-block').append(app.view);
    }
});