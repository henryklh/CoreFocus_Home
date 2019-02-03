/**
 * Go To wrapper.
 *
 * @author Htmlstream
 * @version 1.0
 *
 */

; (function ($) {
    'use strict';
    $.HSCore.components.mmenu = {
        /**
         *
         *
         * @var Object _baseConfig
         */
        _baseConfig: {},

        /**
         *
         *
         * @var jQuery pageCollection
         */
        pageCollection: $(),

        /**
         * Initialization of Go To wrapper.
         *
         * @param String selector (optional)
         * @param Object config (optional)
         *
         * @return jQuery pageCollection - collection of initialized items.
         */

        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) return;

            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;

            this.config.itemSelector = selector;

            //this.mmenuInit();

            return this.pageCollection;
        },

        mmenuInit: function () {
            if ($('#MobileNav').length > 0) {
                $('#MobileNav').find('a[href="/CMSWebParts/Navigation/#"]').each(function () {
                    $('<span>' + $(this).html() + '</span>').insertAfter($(this));
                    $(this).remove();
                });
                var $logoPath;

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
    };
})(jQuery);