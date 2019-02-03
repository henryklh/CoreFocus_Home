var Custom = {
    initialised: false,
    mobile: false,
    printWidth: 680,
    isotopePrintDisable: false,
    isotopeActive: false,
    mmenuLogoPath: '/HDTemplate1/media/skin-image/t1_logo.png',
    init: function () {
        if (!this.initialised) {
            this.initialised = true;
        } else {
            return;
        }

        this.checkMobile();
        this.menuzordInit();
        this.zettaMenuInit();
        this.isotopeListInit();
        this.revolution5Carousel();
        this.revolution5PremiumSlider();
        this.revolution5ProductGallery();
        this.revolution5VideoSlider();
        this.mmenuInit();
        this.mmenuFixedPane();
        this.owlCarousel();
        this.lazyloadInit();
        this.lightGalleryInit();
        this.glassCaseInit();

        this.cmsProductOptionResize();
        this.cmsFormControlTooltip();

        // last
        this.wowInit();

    },
    checkMobile: function () {
        /* Mobile Detect*/
        (function ($) {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                this.mobile = true;
            } else {
                this.mobile = false;
            }
        })(jQuery);
    },
    menuzordInit: function () {
        (function ($) {
            if ($.fn.menuzord) {
                $('.menuzord').menuzord({
                    //effect: 'slide',
                    //align: 'left',
                    indicatorFirstLevel: '<i class="fa fa-angle-down"></i>',
                    indicatorSecondLevel: '<i class="fa fa-angle-right"></i>'
                });
            }
        })(jQuery);
    },
    zettaMenuInit: function () {
        (function ($) {
            if ($.fn.zettaMenu) {
                var $zetta = $('.zetta-menu');
                var $tabCaret = '<i class="fa fa-caret-down"></i>';
                var $subCaret = '<i class="fa fa-angle-down"></i>';
                var $subCaretR = '<i class="zm-caret fa fa-angle-right"></i>';
                var $subCaretL = '<i class="zm-caret fa fa-angle-left"></i>';
                var $defaultZMSize = 200;

                if ($zetta.length > 0) {
                    // Formatting 

                    // - link with caret and size of drop down
                    $zetta.find('> li > a').each(function () {

                        // level 1
                        if ($(this).siblings().length > 0) {
                            if (!($(this).children('i.fa').length > 0)) {
                                $(this).append($tabCaret);
                            }

                            // simple flyout
                            $(this).siblings('ul').each(function () {
                                var $subUL = $(this);

                                if (typeof $subUL.attr('zm-size') == typeof undefined) {
                                    // Element has this attribute
                                    $subUL.attr('zm-size', $defaultZMSize);
                                }

                                // flyout and its sub level
                                $subUL.find('li > a').each(function () {
                                    var $childUL = $(this).siblings('ul');

                                    if ($childUL.length > 0) {

                                        if (typeof $childUL.attr('zm-size') == typeof undefined) {
                                            // Element has this attribute
                                            $childUL.attr('zm-size', $defaultZMSize);
                                        }

                                        if ($childUL.hasClass('zm-drop-left')) {
                                            if (!($(this).children('i.fa').length > 0)) {
                                                $(this).append($subCaretL);
                                            }
                                        }
                                        else {
                                            if (!($(this).children('i.fa').length > 0)) {
                                                $(this).append($subCaretR);
                                            }
                                        }

                                    }
                                });
                                
                            });

                            // multi column flyout
                            $(this).siblings('div.zm-multi-column').each(function () {
                                var $zmTotalSize = 0;

                                $(this).children('ul').each(function () {
                                    var $subUL = $(this);
                                    if (typeof $subUL.attr('zm-size') == typeof undefined) {
                                        // Element has this attribute
                                        $subUL.attr('zm-size', $defaultZMSize);
                                    }

                                    // flyout and its sub level
                                    $subUL.find('li > a').each(function () {
                                        var $childUL = $(this).siblings('ul');

                                        if ($childUL.length > 0) {
                                            if (typeof $childUL.attr('zm-size') == typeof undefined) {
                                                // Element has this attribute
                                                $childUL.attr('zm-size', $defaultZMSize);
                                            }

                                            if ($childUL.hasClass('zm-drop-left')) {
                                                if (!($(this).children('i.fa').length > 0)) {
                                                    $(this).append($subCaretL);
                                                }
                                            }
                                            else {
                                                if (!($(this).children('i.fa').length > 0)) {
                                                    $(this).append($subCaretR);
                                                }
                                            }
                                        }
                                    });


                                    $zmTotalSize += parseInt($subUL.attr('zm-size'));

                                });

                                if (typeof $(this).attr('zm-size') == typeof undefined) {
                                    // Element has this attribute
                                    $(this).attr('zm-size', $zmTotalSize);
                                }
                            });

                            // Mega content menu
                            $(this).siblings('div').each(function () {
                                $(this).find('.hd-nav').each(function () {

                                    var $nA = $(this).children('a');
                                    var $nUL = $(this).children('ul');

                                    if ($nUL.length > 0) {
                                        if (!($nA.children('i.fa').length > 0)) {
                                            $nA.append($subCaret);
                                        }
                                    }
                                });

                            });

                        }

                    });

                    // initialize menu
                    $zetta.zettaMenu({
                        showOn: 'hover',
                        //showOn: 'toggle',
                        fullWidth: false,
                        effect: {
                            name: 'slide-down',
                            easing: 'ease',
                            speed: 400,
                            delay: 0
                        }
                    });
                }
            }
        })(jQuery);
    },
    cmsFormControlTooltip: function () {
        (function ($) {
            $('.EditingFormControlNestedControl ').each(function () {

                var $text = $(this).siblings('.explanation-text');
                var $field = $(this).find('.form-control');

                if ($text.length > 0 && $field.length > 0) {
                    $text.hide();
                    //$(this).attr('title', $text.first().html());
                    $field.tooltip({
                        trigger: 'focus',
                        title: function () {
                            return $text.first().html();
                        }
                    });
                }

            });
        })(jQuery);
    },
    cmsFormButtonEnable: function () {
        (function ($) {

            var $buttons = $('.FormButton, .SubmitButton, .AddToWishlistLink');

            if ($buttons.length > 0) {
                $buttons.removeAttr('disabled');
            }

        })(jQuery);
    },
    cmsFormButtonDisable: function () {
        (function ($) {

            var $buttons = $('.FormButton, .SubmitButton, .AddToWishlistLink');

            if ($buttons.length > 0) {
                $buttons.attr('disabled', 'disabled');
            }
        })(jQuery);
    },
    cmsFormValidationReposition: function () {
        (function ($) {
            if ($('.FormSubmission').length > 0) {
                if ($('.FormSubmission').find('.ErrorLabel').length > 0) {
                    $('html, body').animate({ scrollTop: $('.FormSubmission').offset().top }, 500);
                }
            }
        })(jQuery);
    },
    cmsFormModalSubmitted: function () {
        (function ($) {
            if ($('.ModalForm').length > 0) {
                var infoLabel = $('.ModalForm').find('.InfoLabel');
                if (infoLabel.length > 0) {
                    infoLabel.after('<div class="modal-footer text-xs-center"><button type="button" class="btn btn-sm btn-default" data-dismiss="modal"><i class="fa fa-times"></i> Close</button></div>');
                }
            }
        })(jQuery);
    },
    cmsEmbedMapScrollBlock: function () {
        (function ($) {

            if ($('.EmbedMap').length > 0) {

                $('.EmbedMap iframe').addClass('embed-responsive-item');

                $('.EmbedMap iframe').css("pointer-events", "none");

                $('.EmbedMap').click(function () {
                    $('.EmbedMap iframe').css("pointer-events", "auto");
                });

                $(".EmbedMap").mouseleave(function () {
                    $('.EmbedMap iframe').css("pointer-events", "none");
                });
            }

        })(jQuery);
    },
    cmsFormTooltips: function () {
        (function ($) {
            if ($('.explanation-text').length > 0) {
                $('.explanation-text').each(function () {
                    var $fc = $(this).siblings('.editing-form-control-nested-control');
                    if ($fc.length > 0) {
                        $(this).hide();
                        $fc.find('.form-control').tooltip({
                            placement: 'top',
                            title: $(this).html()
                        });
                    }
                });
            }
        })(jQuery);
    },
    cmsProductOptionResize: function () {
        (function ($) {
            $('.ProductOptionSelectorContainer').each(function () {
                var $r = $(this).find('.radio-list-horizontal');
                if ($r.length > 0) {
                    $(this).addClass('fullwidth');
                }
            });
        })(jQuery);
    },
    sideFlyoutNavigation: function () {
        (function ($) {
            if ($.fn.sideFlyout) {
                if ($('#FlyoutSideNav').length > 0) {
                    $('#FlyoutSideNav').sideFlyout();
                }
            }
        })(jQuery);
    },
    isotopeListInit: function () {
        var self = this;
        (function ($) {
            if ($.fn.isotope) {

                if (($(window).width() <= self.printWidth) && self.isotopePrintDisable) {
                    return false;
                }
                //if ($(window).width() > self.printWidth) {

                var container = $('.isotope-container'),
                layoutMode = container.data('layoutmode');
                container.isotope({
                    itemSelector: '.isotope-item',
                    layoutMode: (layoutMode) ? layoutMode : 'masonry', //layoutMode: 'fitRows', layoutMode: 'masonry',
                    transitionDuration: 0
                });
                self.isotopeActive = true;

                var $filterlinks = $('.isotope-filter');

                $filterlinks.on('click', function (e) {

                    // remove all active class
                    $filterlinks.removeClass('active');

                    // add active class on only this link
                    $(this).addClass('active');

                    container.isotope({
                        filter: $(this).attr('data-filter'),
                        transitionDuration: '0.8s'
                    });

                    e.preventDefault();

                });
                //}
            }
        })(jQuery);
    },
    isotopeListDestory: function () {
        var self = this;
        (function ($) {
            if ($.fn.isotope) {
                if (self.isotopeActive) {
                    var container = $('.isotope-container');
                    container.isotope('destroy');
                }
            }
        })(jQuery);
    },
    revolution5Carousel: function () {
        (function ($) {
            if ($.fn.revolution) {
                if ($('.RevolutionSliderCarousel').length > 0) {
                    var $slider = $('.RevolutionSliderCarousel').find('.rev_slider');

                    $slider.show().revolution({
                        sliderType: "carousel",
                        jsFileLocation: "/App_Themes/basic/plugins/rs-plugin/revolution/js/",
                        sliderLayout: "fullwidth",
                        dottedOverlay: "none",
                        delay: 4000,
                        navigation: {
                            keyboardNavigation: "off",
                            keyboard_direction: "horizontal",
                            mouseScrollNavigation: "off",
                            onHoverStop: "off",
                            arrows: {
                                style: "erinyen",
                                enable: true,
                                hide_onmobile: false,
                                hide_onleave: false,
                                tmp: '',
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
                        carousel: {
                            horizontal_align: "center",
                            vertical_align: "center",
                            fadeout: "on",
                            vary_fade: "on",
                            maxVisibleItems: 3,
                            infinity: "on",
                            space: 0,
                            stretch: "off"
                        },
                        responsiveLevels: [1440, 1240, 1024, 778, 480],
                        gridwidth: [1140, 800, 640, 480, 480],
                        gridheight: [700, 680, 480, 480, 360],
                        lazyType: "none",
                        parallax: {
                            type: "scroll",
                            origo: "enterpoint",
                            speed: 400,
                            levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
                        },
                        shadow: 0,
                        spinner: "off",
                        stopLoop: "on",
                        stopAfterLoops: 0,
                        stopAtSlide: -1,
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
                }
            }
        })(jQuery);
    },
    revolution5PremiumSlider: function () {
        (function ($) {
            if ($.fn.revolution) {
                if ($('.RevolutionSliderPremium').length > 0) {
                    var $slider = $('.RevolutionSliderPremium').find('.rev_slider');

                    $slider.show().revolution({
                        sliderType: "standard",
                        jsFileLocation: "/App_Themes/basic/plugins/rs-plugin/revolution/js/",
                        sliderLayout: "auto",
                        dottedOverlay: "none",
                        delay: 9000,
                        navigation: {
                            keyboardNavigation: "off",
                            keyboard_direction: "horizontal",
                            mouseScrollNavigation: "off",
                            onHoverStop: "off",
                            touch: {
                                touchenabled: "on",
                                swipe_threshold: 75,
                                swipe_min_touches: 50,
                                swipe_direction: "horizontal",
                                drag_block_vertical: false
                            },
                            bullets: {
                                enable: true,
                                hide_onmobile: true,
                                hide_under: 800,
                                style: "zeus",
                                hide_onleave: false,
                                direction: "horizontal",
                                h_align: "center",
                                v_align: "bottom",
                                h_offset: 0,
                                v_offset: 30,
                                space: 5,
                                tmp: '<span class="tp-bullet-image"></span><span class="tp-bullet-imageoverlay"></span><span class="tp-bullet-title">{{title}}</span>'
                            }


                        },
                        responsiveLevels: [1200, 1024, 778, 480],
                        visibilityLevels: [1200, 1024, 778, 480],
                        gridwidth: [1200, 1024, 778, 480],
                        gridheight: [600, 600, 960, 720],
                        lazyType: "none",
                        parallax: {
                            type: "scroll",
                            origo: "slidercenter",
                            speed: 1000,
                            levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 100, 55],
                            type: "scroll",
                        },
                        shadow: 0,
                        spinner: "off",
                        stopLoop: "on",
                        stopAfterLoops: 0,
                        stopAtSlide: 1,
                        shuffle: "off",
                        autoHeight: "off",
                        fullScreenAutoWidth: "off",
                        fullScreenAlignForce: "off",
                        fullScreenOffsetContainer: "",
                        fullScreenOffset: "60px",
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
                }
            }
        })(jQuery);
    },
    revolution5ProductGallery: function () {
        (function ($) {
            if ($.fn.revolution) {
                if ($('.RevolutionSliderProductGallery').length > 0) {
                    var $slider = $('.RevolutionSliderProductGallery').find('.rev_slider');

                    $slider.show().revolution({
                        sliderType: "standard",
                        jsFileLocation: "/App_Themes/basic/plugins/rs-plugin/revolution/js/",
                        sliderLayout: "auto",
                        dottedOverlay: "none",
                        delay: 9000,
                        navigation: {
                            keyboardNavigation: "off",
                            keyboard_direction: "horizontal",
                            mouseScrollNavigation: "off",
                            onHoverStop: "off",
                            arrows: {
                                style: "erinyen",
                                enable: true,
                                hide_onmobile: true,
                                hide_under: 600,
                                hide_onleave: true,
                                hide_delay: 200,
                                hide_delay_mobile: 1200,
                                //tmp: '<div class="tp-title-wrap">  	<div class="tp-arr-imgholder"></div>    <div class="tp-arr-img-over"></div>	<span class="tp-arr-titleholder">{{title}}</span> </div>',
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
									,
                            thumbnails: {
                                style: "gyges",
                                enable: true,
                                width: 120,
                                height: 60,
                                min_width: 60,
                                wrapper_padding: 0,
                                wrapper_color: "transparent",
                                wrapper_opacity: "1",
                                tmp: '<span class="tp-thumb-img-wrap">  <span class="tp-thumb-image"></span></span>',
                                visibleAmount: 5,
                                hide_onmobile: true,
                                hide_under: 800,
                                hide_onleave: false,
                                direction: "horizontal",
                                span: false,
                                position: "inner",
                                space: 5,
                                h_align: "center",
                                v_align: "bottom",
                                h_offset: 0,
                                v_offset: 20
                            }
                        },
                        viewPort: {
                            enable: true,
                            outof: "pause",
                            visible_area: "80%"
                        },
                        responsiveLevels: [1240, 1024, 778, 480, 360],
                        gridwidth: [1240, 1024, 778, 480, 360],
                        gridheight: [800, 600, 500, 400, 400],
                        lazyType: "none",
                        parallax: {
                            type: "mouse",
                            origo: "slidercenter",
                            speed: 2000,
                            levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
                        },
                        shadow: 0,
                        spinner: "off",
                        stopLoop: "off",
                        stopAfterLoops: -1,
                        stopAtSlide: -1,
                        shuffle: "off",
                        autoHeight: "off",
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
                }
            }
        })(jQuery);
    },
    revolution5VideoSlider: function () {
        (function ($) {
            if ($.fn.revolution) {
                if ($('.RevolutionSliderVideo').length > 0) {
                    var $slider = $('.RevolutionSliderVideo').find('.rev_slider');

                    $slider.show().revolution({
                        sliderType: "standard",
                        jsFileLocation: "/App_Themes/basic/plugins/rs-plugin/revolution/js/",
                        sliderLayout: "auto",
                        dottedOverlay: "none",
                        delay: 9000,
                        navigation: {
                            keyboardNavigation: "off",
                            keyboard_direction: "horizontal",
                            mouseScrollNavigation: "off",
                            onHoverStop: "off",
                            tabs: {
                                style: "hesperiden",
                                enable: true,
                                width: 250,
                                height: 80,
                                min_width: 250,
                                wrapper_padding: 20,
                                wrapper_color: "#ffffff",
                                wrapper_opacity: "1",
                                tmp: '<div class="tp-tab-content">  <span class="tp-tab-date">{{param1}}</span>  <span class="tp-tab-title">{{title}}</span></div><div class="tp-tab-image"></div>',
                                visibleAmount: 5,
                                hide_onmobile: false,
                                hide_onleave: false,
                                hide_delay: 200,
                                direction: "horizontal",
                                span: false,
                                position: "outer-bottom",
                                space: 0,
                                h_align: "left",
                                v_align: "bottom",
                                h_offset: 0,
                                v_offset: 0
                            }
                        },
                        gridwidth: 1230,
                        gridheight: 692,
                        lazyType: "smart",
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
                }
            }
        })(jQuery);
    },
    mmenuInit: function () {
        (function ($) {

            if ($.fn.mmenu) {
                if ($('#MobileNav').length > 0) {

                    $('#MobileNav').find('a[href="/CMSWebParts/Navigation/#"]').each(function () {
                        $('<span>' + $(this).html() + '</span>').insertAfter($(this));
                        $(this).remove();
                    });
                    var $logoPath = Custom.mmenuLogoPath;

                    if ($('.toplogo').length > 0) {
                        $logoPath = $('.toplogo').attr('src');
                    }

                    $('#MobileNav').mmenu({
                        // options go here
                        extensions: ['theme-white', 'border-full'],
                        navbar: {
                            title: 'Navigation'
                        },
                        navbars: [
                            {
                                position: 'top',
                                height: 2,
                                content: '<div class="text-xs-center p-y-1 mm-navbar-size-2"><a href="/"><img src="' + $logoPath + '" class="img-fluid-inline-block" /></a></div>'
                            },
                            {
                                position: 'bottom',
                                content: '<div class="text-xs-center p-y-0"><a class="btn-icon-circle btn-twitter-outline" href="#"><i class="fa fa-twitter"></i></a><a class="btn-icon-circle btn-pinterest-outline" href="#"><i class="fa fa-pinterest-p"></i></a><a class="btn-icon-circle btn-facebook-outline" href="#"><i class="fa fa-facebook"></i></a></div>'
                            },
                            {
                                position: 'top',
                                content: ['prev', 'title', 'close']
                            }
                        ]
                    },
                    {
                        // Configs go here
                        classNames: {
                            selected: 'Highlighted'
                        },
                        offCanvas: {
                            pageNodetype: 'form'
                        }
                    });

                    //$('#Main').css({ 'padding-top': '60px' });

                    $('#MobileNav').find('a.mm-fullsubopen').each(function () {
                        $(this).html('<span>' + $(this).next().html() + '</span>');
                        $(this).next().css({ 'display': 'none' });
                    });

                    //-- adding bind features

                    //var mmApi = $("#MobileNav").data("mmenu");
                }
            }
        })(jQuery);
    },
    mmenuFixedPane: function () {

        (function ($) {

            if ($('.mm-fixed-pane').length > 0) {

                var $navBar = $('.mm-fixed-pane');
                var $alwaysFixed = $navBar.hasClass('force-fixed');
                var $forcePadding = $navBar.hasClass('force-padding');
                var $dynamicPadding = $navBar.hasClass('dynamic-padding');
                var $fixedOffset = 120;
                var $y = $(document).scrollTop();
                var $w = $(window).width();

                if ($dynamicPadding) {
                    $fixedOffset = $navBar.outerHeight();
                }

                if ($forcePadding) {
                    $('form').css({ 'padding-top': $fixedOffset + 'px' });
                }


                if ($alwaysFixed) {

                    if ($y >= $fixedOffset) {
                        $navBar.css({ 'position': 'fixed', 'top': '0', 'bottom': 'auto' });
                        $navBar.addClass('position-fixed');
                    }
                    else {
                        $navBar.removeAttr('style');
                        $navBar.removeClass('position-fixed');

                        if ($forcePadding) {
                            $('form').css({ 'padding-top': $fixedOffset + 'px' });
                        }
                    }

                    return;
                }

                // responsive reset
                if ($w < 992) {
                    if ($y >= $fixedOffset) {
                        $navBar.css({ 'position': 'fixed', 'top': '0', 'bottom': 'auto' });
                        $navBar.addClass('position-fixed');
                    }
                    else {
                        $navBar.removeAttr('style');
                        $navBar.removeClass('position-fixed');

                        if ($forcePadding) {
                            $('form').css({ 'padding-top': $fixedOffset + 'px' });
                        }
                    }
                }
                else {
                    $navBar.removeAttr('style');
                    $navBar.removeClass('position-fixed');

                    if ($forcePadding) {
                        $('form').css({ 'padding-top': $fixedOffset + 'px' });
                    }
                }
            }

        })(jQuery);
        
    },
    mmenuResetStatus: function () {
        (function ($) {
            var $w = $(window).width();
            if ((!this.mobile) && ($w >= 1200)) {
                
                if ($('#MobileNav').hasClass('mm-opened')) {
                    var mmApi = $("#MobileNav").data("mmenu");
                    mmApi.close();
                }
            }
        })(jQuery);
    },
    owlCarousel: function () {
        (function ($) {
            if($.fn.owlCarousel)
            {
                // image slider
                
                if ($('.owl-carousel').length > 0) {
                    $('.owl-carousel').each(function () {
                        var $b = false;
                        var $owl = $(this);


                        // images slider
                        if ($owl.hasClass('owl-carousel-image-slider')) {

                            if ($owl.find('img').length > 1) {
                                $b = true;
                            }

                            $owl.owlCarousel({
                                //stagePadding: 160,
                                loop: $b,
                                margin: 30,
                                responsiveClass: true,
                                nav: $b,
                                //navText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
                                dots: false,
                                autoplay: $b,
                                autoplayTimeout: 9000,
                                responsive: {
                                    0: {
                                        items: 1,
                                    }
                                }
                            });
                        }

                        // images carousel
                        if ($owl.hasClass('owl-carousel-image-carousel')) {

                            if ($owl.find('img').length > 1) {
                                $b = true;
                            }

                            $owl.owlCarousel({
                                stagePadding: 30,
                                loop: true,
                                margin: 30,
                                responsiveClass: true,
                                nav: true,
                                //navText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
                                dots: false,
                                autoplay: true,
                                autoplayTimeout: 9000,
                                responsive: {
                                    0: {
                                        items: 2
                                    },
                                    480: {
                                        items: 4
                                    },
                                    768: {
                                        items: 6
                                    },
                                    992: {
                                        items: 8
                                    }
                                }
                            });
                        }

                        // html content carousel
                        if ($owl.hasClass('owl-carousel-html-carousel')) {

                            if ($owl.find('img').length > 1) {
                                $b = true;
                            }

                            $owl.owlCarousel({
                                loop: true,
                                responsiveClass: true,
                                nav: true,
                                stagePadding: 30,
                                margin: 30,
                                //navText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
                                dots: true,
                                autoplay: true,
                                autoplayTimeout: 10000,
                                responsive: {
                                    0: {
                                        items: 1,
                                        stagePadding: 30,
                                        margin: 30,
                                    },
                                    480: {
                                        items: 1,
                                        stagePadding: 60,
                                        margin: 60,
                                    },
                                    640: {
                                        items: 2,
                                        stagePadding: 30,
                                        margin: 30,
                                    },
                                    768: {
                                        items: 2,
                                        stagePadding: 60,
                                        margin: 60,
                                    },
                                    992: {
                                        items: 3,
                                        stagePadding: 60,
                                        margin: 60,
                                    },
                                    1200: {
                                        items: 3,
                                        stagePadding: 120,
                                        margin: 120,
                                    }

                                }

                            });

                        }

                    });

                }

            }

        })(jQuery);
    },
    bootstrapScrollspy: function ($nav) {
        (function ($) {
            //if (!this.mobile) {
            if ($.fn.scrollspy) {

                $nav = $nav || $('#ScrollspyNav');

                if ($nav.length > 0) {
                    $('body').attr({ 'data-spy': 'scroll', 'data-target': $nav, 'data-offset': $nav.outerHeight() });
                    $nav.find('a.nav-link').on('click', function (e) {
                        if ($(this).attr('href').length > 0) {
                            $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top - $nav.outerHeight() }, 500);
                        }
                        e.preventDefault();
                    });
                }
                
            }
            //}
        })(jQuery);
    },
    bootstrapNavbarSticky: function () {
        (function ($) {
            if ($('.NavbarStickyWrapper').length > 0) {

                var $stickyWrapper = $('.NavbarStickyWrapper');
                var $stickyNav = $stickyWrapper.find('.navbar-sticky');
                    
                var $stickyTop = $stickyWrapper.offset().top;
                var $stickyBottom = $stickyTop + $stickyWrapper.height() - $stickyNav.height();

                var $w = $(window).width();
                var $y = $(document).scrollTop();

                if (!($stickyNav.length > 0)) {
                    return false;
                }

                var $useOffset = $stickyNav.hasClass('navbar-offset');
                var $showOnScroll = $stickyNav.hasClass('navbar-scroll-visible');

                if ($useOffset) {
                    if ($stickyNav.hasClass('hidden-md-down') && $w < 992) {
                        $stickyWrapper.css({ 'padding-top': '' });
                    }
                    else {
                        $stickyWrapper.css({ 'padding-top': $stickyNav.outerHeight() + 'px' });
                    }
                }

                var $w = $(window).width();

                if ($w < 992) {
                    $stickyNav.addClass('navbar-hidden');
                }
                else {
                    
                    $stickyNav.removeClass('navbar-hidden');

                    if ($y >= $stickyTop && $y <= $stickyBottom) {
                        $stickyNav.css({ 'position': 'fixed', 'top': '0', 'bottom': 'auto' });
                        $stickyNav.addClass('navbar-fixed');
                        if ($showOnScroll) {
                            $stickyNav.removeClass('navbar-hidden');
                        }
                    }
                    else if ($y > $stickyBottom) {
                        $stickyNav.css({ 'position': 'absolute', 'top': 'auto', 'bottom': '0' });
                        $stickyNav.removeClass('navbar-fixed');
                        if ($showOnScroll) {
                            $stickyNav.removeClass('navbar-hidden');
                        }
                    }
                    else {
                        $stickyNav.css({ 'position': 'absolute', 'top': '0', 'bottom': 'auto' });
                        $stickyNav.removeClass('navbar-fixed');
                        if ($showOnScroll) {
                            $stickyNav.addClass('navbar-hidden');
                        }
                    }
                }
                
                if ($stickyNav.hasClass('navbar-scrollspy')) {
                    Custom.bootstrapScrollspy($stickyNav);
                }
                
            }
        })(jQuery);
    },
    bootstrapCollapseAccordion: function () {
        (function ($) {

            var $w = $(window).width();
            //-- adding scroll to the top of the content when expanded.
            $('.collapse').on('shown.bs.collapse', function () {
                // Scroll to heading top
                $('html, body').animate({ scrollTop: $('#' + $(this).attr('aria-labelledby')).offset().top - $(this).outerHeight() }, 500);
            })
        })(jQuery);
    },
    bootstrapModal: function () {
        (function ($) {
            $('[data-toggle="modal"]').on('click', function (e) {
                $($(this).attr('data-current')).modal('hide');
            });
        })(jQuery);
    },
    lazyloadInit: function () {
        (function ($) {
            if ($('img.lazy').length > 0) {
                    $("img.lazy").lazyload({ effect: 'fadeIn' });
            }
        })(jQuery);
    },
    lightGalleryInit: function (_selector, _item) {
        _selector = _selector || '#LightGallery';
        _item = _item || '.zoom-item';

        (function ($) {
            if ($.fn.lightGallery) {
                if ($(_selector).length > 0) {
                    $(_selector).lightGallery({
                        selector: _item
                    })
                }
            }
        })(jQuery);
    },
    glassCaseInit: function () {

        (function ($) {
            if ($('.gc-start').length > 0) {
                var wrapperwidth = $('.gc-start').parent().width();
                $('.gc-start').glassCase({
                    'isDownloadEnabled': false,
                    'widthDisplay': wrapperwidth,
                    'heightDisplay': wrapperwidth * 2 / 3,
                    'isSlowZoom': true,
                    'colorIcons': '#46bbef',
                    'colorActiveThumb': '#46bbef'
                });
            }
        })(jQuery);

    },
    wowInit: function () {
        new WOW().init();
    }
    
};

//Custom.init();
//if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    
//} else {
//    skrollr.init({
//        smoothScrolling: false,
//        forceHeight: false,
//        mobileDeceleration: 0.004
//    });
//}

(function () {
    var beforePrint = function () {
        console.log('Functionality to run before printing.');
        Custom.isotopeListDestory();
    };
    var afterPrint = function () {
        console.log('Functionality to run after printing');
        Custom.isotopeListInit()
    };

    if (window.matchMedia) {
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function (mql) {
            if (mql.matches) {
                beforePrint();
            } else {
                afterPrint();
            }
        });
    }

    window.onbeforeprint = beforePrint;
    window.onafterprint = afterPrint;
}());

(function ($) {

    $(document).ready(function () {
        if (!($('body').hasClass('DesignMode') || $('body').hasClass('EditMode'))) {
            Custom.init();
        }

    });


    $(document).scroll(function (event) {

        Custom.mmenuFixedPane();
        Custom.bootstrapNavbarSticky();

    });

    $(window).on('resize', function (event) {

        Custom.mmenuFixedPane();
        Custom.bootstrapNavbarSticky();
        Custom.mmenuResetStatus();

    });

    $(window).load(function () {
        //Custom.isotopeListing();
        //Custom.cmsFormTooltips();
    });

})(jQuery);

// -- on asp.net Ajax request
Sys.WebForms.PageRequestManager.getInstance().add_beginRequest(startRequest);
Sys.WebForms.PageRequestManager.getInstance().add_endRequest(endRequest);

function startRequest(sender, e) {
    //disable button during the AJAX call

    Custom.cmsFormButtonDisable();
}

function endRequest(sender, e) {
    //re-enable button once the AJAX call has completed

    Custom.cmsFormButtonEnable();
    Custom.cmsFormValidationReposition();
    Custom.cmsFormModalSubmitted();
    Custom.cmsProductOptionResize();
}