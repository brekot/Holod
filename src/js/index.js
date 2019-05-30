import $ from "jquery";
//import popper from "popper.js";
//import bootstrap from "bootstrap";
//import Swiper from 'swiper';

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

    /* - - - Прокрутка к элементу - - - */
    $('.go-to').click(function(){

        var scroll_el = $(this).attr('href');

        if ($(scroll_el).length != 0)
        {
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top - 100 }, 1000);
        }

        return false;
    });

    /* - - - Прилепляем шапку - - - */
	var headerOffset = $('.header-main').offset().top;

	$(window).scroll(function(){

		var scrollTop = $(window).scrollTop();

        if ($('.header-main__top').height() == 70)
        {
            if (scrollTop > headerOffset) $('.header-main').addClass('header-main_fixed');
            else $('.header-main').removeClass('header-main_fixed');
        }
        else
        {
            if (scrollTop > headerOffset + 60) $('.header-main').addClass('header-main_fixed');
            else $('.header-main').removeClass('header-main_fixed');
        }
	});

    /* - - - Раскрываем меню - - - */
    $('.nav-top__btn').click(function(){

        $('.header-main').toggleClass('header-main_open');
        $('.header-main__box').toggleClass('header-main__box_open');
    });

    $('.nav-top__level-one > a').click(function(){

        if ($('.header-main__top').height() == 70)
        {
            $('.nav-top__level-one').removeClass('nav-top__level-one_open');

            $(this).parent().addClass('nav-top__level-one_open');

            return false;
        }
    });

    /* - - - Раскрытие tab-panel-select - - - */
    $(document).on('click', '.tab-panel-select__item_active', function(){

        $(this).toggleClass('tab-panel-select__item_open');
        
        $(this).next('.tab-panel-select__items').slideToggle();

        return false;
    });
});