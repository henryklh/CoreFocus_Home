/**
 * HSCore -
 *
 * @author HtmlStream
 * @version 1.0
 */

(function ($) {
    'use strict';

    $.HSCore = {
        init: function () {
            $(document).ready(function (e) {
                // Botostrap Tootltips
                $('[data-toggle="tooltip"]').tooltip();

                // Set Background Image Dynamically
                if ($('[data-bg-img-src]').length) $.HSCore.helpers.bgImage($('[data-bg-img-src]'));

                // Extends jQuery
                $.HSCore.helpers.extendjQuery();

                // Detect Internet Explorer (IE)
                $.HSCore.helpers.detectIE();

                // Bootstrap Navigation Options
                $.HSCore.helpers.bootstrapNavOptions.init();
            });

            $(window).on('load', function (e) {
            });
        },

        /**
         *
         *
         * @var
         */
        components: {},

        /**
         *
         *
         * @var
         */
        helpers: {
            Math: {
                getRandomValueFromRange: function (startPoint, endPoint, fixed) {
                    var fixedInner = fixed ? fixed : false;

                    Math.random();

                    return fixedInner ? (Math.random() * (endPoint - startPoint) + startPoint) : (Math.floor(Math.random() * (endPoint - startPoint + 1)) + startPoint);
                }
            },

            /*
             * Sets background-image dynamically.
             */
            bgImage: function (collection) {
                if (!collection || !collection.length) return;

                return collection.each(function (i, el) {
                    var $el = $(el),
                        bgImageSrc = $el.data('bg-img-src');

                    if (bgImageSrc) $el.css('background-image', 'url(' + bgImageSrc + ')');
                });
            },

            /**
             * Extends basic jQuery functionality
             */
            extendjQuery: function () {
                $.fn.extend({
                    /*
                     * Runs specified function after loading of all images.
                     */
                    imagesLoaded: function () {
                        var $imgs = this.find('img[src!=""]');

                        if (!$imgs.length) {
                            return $.Deferred().resolve().promise();
                        }

                        var dfds = [];

                        $imgs.each(function () {
                            var dfd = $.Deferred();
                            dfds.push(dfd);
                            var img = new Image();
                            img.onload = function () {
                                dfd.resolve();
                            };
                            img.onerror = function () {
                                dfd.resolve();
                            };
                            img.src = this.src;
                        });

                        return $.when.apply($, dfds);
                    }
                });
            },

            /**
             * Detect Internet Explorer (IE)
             *
             * @return version of IE or false, if browser is not Internet Explorer
             */

            detectIE: function () {
                var ua = window.navigator.userAgent;

                var trident = ua.indexOf('Trident/');
                if (trident > 0) {
                    // IE 11 => return version number
                    var rv = ua.indexOf('rv:');
                    var ieV = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
                    document.querySelector('body').className += ' IE';
                }

                var edge = ua.indexOf('Edge/');
                if (edge > 0) {
                    // IE 12 (aka Edge) => return version number
                    var ieV = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
                    document.querySelector('body').className += ' IE';
                }

                // other browser
                return false;
            },

            /**
             * Bootstrap navigation options
             *
             */
            bootstrapNavOptions: {
                init: function () {
                    this.mobileHideOnScroll();
                },

                mobileHideOnScroll: function () {
                    var $collection = $('.navbar');
                    if (!$collection.length) return;

                    var $w = $(window),
                        breakpointsMap = {
                            'sm': 576,
                            'md': 768,
                            'lg': 992,
                            'xl': 1200
                        };

                    $('body').on('click.HSMobileHideOnScroll', '.navbar-toggler', function (e) {
                        var $navbar = $(this).closest('.navbar');

                        if ($navbar.length) {
                            $navbar.data('mobile-menu-scroll-position', $w.scrollTop());
                        }
                        e.preventDefault();
                    });

                    $w.on('scroll.HSMobileHideOnScroll', function (e) {
                        $collection.each(function (i, el) {
                            var $this = $(el), $toggler, $nav, offset, $hamburgers, breakpoint;
                            if ($this.hasClass('navbar-expand-xl')) breakpoint = breakpointsMap['xl'];
                            else if ($this.hasClass('navbar-expand-lg')) breakpoint = breakpointsMap['lg'];
                            else if ($this.hasClass('navbar-expand-md')) breakpoint = breakpointsMap['md'];
                            else if ($this.hasClass('navbar-expand-xs')) breakpoint = breakpointsMap['xs'];

                            if ($w.width() > breakpoint) return;

                            $toggler = $this.find('.navbar-toggler');
                            $nav = $this.find('.navbar-collapse');

                            if (!$nav.data('mobile-scroll-hide')) return;

                            if ($nav.length) {
                                offset = $this.data('mobile-menu-scroll-position');

                                if (Math.abs($w.scrollTop() - offset) > 40 && $nav.hasClass('show')) {
                                    $toggler.trigger('click');
                                    $hamburgers = $toggler.find('.is-active');
                                    if ($hamburgers.length) {
                                        $hamburgers.removeClass('is-active');
                                    }
                                }
                            }
                        });
                    });
                }
            }
        },
        mmenuInit: function () {
            if ($('#MainNav').length > 0) {
                $('#MainNav').find('a[href="/CMSWebParts/Navigation/#"]').each(function () {
                    $('<span>' + $(this).html() + '</span>').insertAfter($(this));
                    $(this).remove();
                });
                var $logoPath;

                if ($('.toplogo').length > 0) {
                    $logoPath = $('.toplogo').attr('src');
                }

                $('#MainNav').mmenu({
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
                        },
                        clone: true
                    });

                $('.mm-navbar img').css({ 'max-width': '240px' });

                $('#MainNav').find('a.mm-fullsubopen').each(function () {
                    $(this).html('<span>' + $(this).next().html() + '</span>');
                    $(this).next().css({ 'display': 'none' });
                });

                //-- adding bind features
            }
        },
        /**
         *
         *
         * @var
         */
        settings: {
            rtl: false
        }
    };

    $.HSCore.init();
})(jQuery);