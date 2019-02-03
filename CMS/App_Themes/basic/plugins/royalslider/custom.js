//jQuery(document).ready(function ($) {

//    var galleryHideOverlay = setTimeout($('.ArtistGallery .Loading').hide(500), 3000);

//    $('.royalSlider').royalSlider({
//        fullscreen: {
//            enabled: true,
//            nativeFS: true
//        },
//        controlNavigation: 'thumbnails',
//        autoScaleSlider: true,
//        autoPlay: {
//            // autoplay options go gere
//            enabled: true,
//            pauseOnHover: true,
//            delay: 5000
//        },
//        autoScaleSliderWidth: 1280,
//        autoScaleSliderHeight: 960,
//        loop: true,
//        imageScaleMode: 'fit-if-smaller',
//        navigateByClick: true,
//        numImagesToPreload: 2,
//        arrowsNav: true,
//        arrowsNavAutoHide: true,
//        arrowsNavHideOnTouch: true,
//        keyboardNavEnabled: true,
//        fadeinLoadedSlide: true,
//        globalCaption: false,
//        globalCaptionInside: false,
//        thumbs: {
//            appendSpan: true,
//            firstMargin: true,
//            paddingBottom: 4
//        }
//    }).end(function () { alert('ok after loaded'); });

//});
jQuery(document).ready(function ($) {
    $('.royalSlider').royalSlider({
        fullscreen: {
            enabled: true,
            nativeFS: true
        },
        controlNavigation: 'thumbnails',
        thumbs: {
            //orientation: 'vertical',
            spacing: 10,
            appendSpan: true
        },
        imageScalePadding: 0,
        transitionType: 'fade',
        autoScaleSlider: true,
        autoScaleSliderWidth: 930,
        autoScaleSliderHeight: 731,
        loop: true,
        arrowsNav: true,
        arrowsNavAutoHide: true,
        arrowsNavHideOnTouch: true,
        keyboardNavEnabled: true

    });
});
    
//jQuery(document).ready(function ($) {
//    $('.royalSlider').royalSlider({
//        fullscreen: {
//            enabled: true,
//            nativeFS: true
//        },
//        controlNavigation: 'thumbnails',
//        thumbs: {
//            orientation: 'vertical',
//            spacing: 10,
//            appendSpan: true
//        },
//        imageScalePadding: 0,
//        transitionType: 'fade',
//        autoScaleSlider: true,
//        autoScaleSliderWidth: 930,
//        autoScaleSliderHeight: 514,
//        loop: true,
//        arrowsNav: true,
//        arrowsNavAutoHide: true,
//        arrowsNavHideOnTouch: true,
//        keyboardNavEnabled: true

//    });
//});