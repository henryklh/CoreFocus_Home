jQuery("#home-slider").show().revolution({
    sliderType: "standard",
    jsFileLocation: "/App_Themes/basic/plugins/rs-plugin/revolution/js/",
    sliderLayout: "auto",
    dottedOverlay: "none",
    delay: 9000,
    navigation: {
        arrows: {
            style: "zeus",
            enable: true,
            hide_onmobile: true,
            hide_under: 600,
            hide_onleave: true,
            hide_delay: 200,
            hide_delay_mobile: 1200,
            tmp: '<div class="tp-title-wrap">  	<div class="tp-arr-imgholder"></div> </div>',
            left: {
                h_align: "left",
                v_align: "center",
                h_offset: 30,
                v_offset: 0
            },
            right: {
                h_align: "right",
                v_align: "center",
                h_offset: 30,
                v_offset: 0
            }
        }


    },
    responsiveLevels: [1240, 1024, 778, 480],
    gridwidth: [1024, 850, 778, 480],
    gridheight: [600, 500, 450, 400],
    lazyType: "none",
    parallax: {
        type: "mouse",
        origo: "slidercenter",
        speed: 2000,
        bgparallax: "on",
        levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50]
    },
    shadow: 0,
    spinner: "off",
    stopLoop: "on",
    stopAfterLoops: 0,
    stopAtSlide: 1,
    shuffle: "off",
    autoHeight: "off",
    disableProgressBar: "on",
    hideThumbsOnMobile: "off",
    hideSliderAtLimit: 0,
    hideCaptionAtLimit: 0,
    hideAllCaptionAtLilmit: 0,
    debugMode: false,
    fallbacks: {
        simplifyAll: "off",
        nextSlideOnWindowFocus: "off",
        disableFocusListener: false,
    }
});