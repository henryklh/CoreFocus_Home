$(document).on('ready', function () {
    // initialization of HSMegaMenu component
    $('.js-mega-menu').HSMegaMenu({
        event: 'hover',
        pageContainer: $('.container'),
        breakpoint: 991
    });

    new LazyLoad();

    $.HSCore.components.HSCarousel.init('[class*="js-carousel"]');

    $('#carouselCus1').slick('setOption', 'responsive', [{
        breakpoint: 1200,
        settings: {
            slidesToShow: 4
        }
    }, {
        breakpoint: 992,
        settings: {
            slidesToShow: 3
        }
    }, {
        breakpoint: 768,
        settings: {
            slidesToShow: 2
        }
    }], true);
});

//$.HSCore.mmenuInit();