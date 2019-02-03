var $j = jQuery.noConflict();

$j(function () {
    // ACTIVITY INDICATOR

    var activityIndicatorOn = function () {
        $j('<div id="imagelightbox-loading"><div></div></div>').appendTo('body');
    },
        activityIndicatorOff = function () {
            $j('#imagelightbox-loading').remove();
        },


        // OVERLAY

        overlayOn = function () {
            $j('<div id="imagelightbox-overlay"></div>').appendTo('body');
        },
        overlayOff = function () {
            $j('#imagelightbox-overlay').remove();
        },


        // CLOSE BUTTON

        closeButtonOn = function (instance) {
            $j('<button type="button" id="imagelightbox-close" title="Close"></button>').appendTo('body').on('click touchend', function () { $j(this).remove(); instance.quitImageLightbox(); return false; });
        },
        closeButtonOff = function () {
            $j('#imagelightbox-close').remove();
        },


        // CAPTION

        captionOn = function () {
            var description = $j('a[href="' + $j('#imagelightbox').attr('src') + '"] img').attr('alt');
            if (description.length > 0)
                $j('<div id="imagelightbox-caption">' + description + '</div>').appendTo('body');
        },
        captionOff = function () {
            $j('#imagelightbox-caption').remove();
        },


        // NAVIGATION

        navigationOn = function (instance, selector) {
            var images = $j(selector);
            if (images.length) {
                var nav = $j('<div id="imagelightbox-nav"></div>');
                for (var i = 0; i < images.length; i++)
                    nav.append('<button type="button"></button>');

                nav.appendTo('body');
                nav.on('click touchend', function () { return false; });

                var navItems = nav.find('button');
                navItems.on('click touchend', function () {
                    var $jthis = $j(this);
                    if (images.eq($jthis.index()).attr('href') != $j('#imagelightbox').attr('src'))
                        instance.switchImageLightbox($jthis.index());

                    navItems.removeClass('active');
                    navItems.eq($jthis.index()).addClass('active');

                    return false;
                })
                .on('touchend', function () { return false; });
            }
        },
        navigationUpdate = function (selector) {
            var items = $j('#imagelightbox-nav button');
            items.removeClass('active');
            items.eq($j(selector).filter('[href="' + $j('#imagelightbox').attr('src') + '"]').index(selector)).addClass('active');
        },
        navigationOff = function () {
            $j('#imagelightbox-nav').remove();
        },


        // ARROWS

        arrowsOn = function (instance, selector) {
            var $jarrows = $j('<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"></button>');

            $jarrows.appendTo('body');

            $jarrows.on('click touchend', function (e) {
                e.preventDefault();

                var $jthis = $j(this),
                    $jtarget = $j(selector + '[href="' + $j('#imagelightbox').attr('src') + '"]'),
                    index = $jtarget.index(selector);

                if ($jthis.hasClass('imagelightbox-arrow-left')) {
                    index = index - 1;
                    if (!$j(selector).eq(index).length)
                        index = $j(selector).length;
                }
                else {
                    index = index + 1;
                    if (!$j(selector).eq(index).length)
                        index = 0;
                }

                instance.switchImageLightbox(index);
                return false;
            });
        },
        arrowsOff = function () {
            $j('.imagelightbox-arrow').remove();
        };


    ////	WITH ACTIVITY INDICATION

    //$j('a[data-imagelightbox="a"]').imageLightbox(
    //{
    //    onLoadStart: function () { activityIndicatorOn(); },
    //    onLoadEnd: function () { activityIndicatorOff(); },
    //    onEnd: function () { activityIndicatorOff(); }
    //});


    ////	WITH OVERLAY & ACTIVITY INDICATION

    //$j('a[data-imagelightbox="b"]').imageLightbox(
    //{
    //    onStart: function () { overlayOn(); },
    //    onEnd: function () { overlayOff(); activityIndicatorOff(); },
    //    onLoadStart: function () { activityIndicatorOn(); },
    //    onLoadEnd: function () { activityIndicatorOff(); }
    //});


    ////	WITH "CLOSE" BUTTON & ACTIVITY INDICATION

    //var instanceC = $j('a[data-imagelightbox="c"]').imageLightbox(
    //{
    //    quitOnDocClick: false,
    //    onStart: function () { closeButtonOn(instanceC); },
    //    onEnd: function () { closeButtonOff(); activityIndicatorOff(); },
    //    onLoadStart: function () { activityIndicatorOn(); },
    //    onLoadEnd: function () { activityIndicatorOff(); }
    //});


    ////	WITH CAPTION & ACTIVITY INDICATION

    //$j('a[data-imagelightbox="d"]').imageLightbox(
    //{
    //    onLoadStart: function () { captionOff(); activityIndicatorOn(); },
    //    onLoadEnd: function () { captionOn(); activityIndicatorOff(); },
    //    onEnd: function () { captionOff(); activityIndicatorOff(); }
    //});


    ////	WITH ARROWS & ACTIVITY INDICATION

    //var selectorG = 'a[data-imagelightbox="g"]';
    //var instanceG = $j(selectorG).imageLightbox(
    //{
    //    onStart: function () { arrowsOn(instanceG, selectorG); },
    //    onEnd: function () { arrowsOff(); activityIndicatorOff(); },
    //    onLoadStart: function () { activityIndicatorOn(); },
    //    onLoadEnd: function () { $j('.imagelightbox-arrow').css('display', 'block'); activityIndicatorOff(); }
    //});


    ////	WITH NAVIGATION & ACTIVITY INDICATION

    //var selectorE = 'a[data-imagelightbox="e"]';
    //var instanceE = $j(selectorE).imageLightbox(
    //{
    //    onStart: function () { navigationOn(instanceE, selectorE); },
    //    onEnd: function () { navigationOff(); activityIndicatorOff(); },
    //    onLoadStart: function () { activityIndicatorOn(); },
    //    onLoadEnd: function () { navigationUpdate(selectorE); activityIndicatorOff(); }
    //});


    ////	ALL COMBINED

    //var selectorF = 'a[data-imagelightbox="f"]';
    //var instanceF = $j(selectorF).imageLightbox(
    //{
    //    onStart: function () { overlayOn(); closeButtonOn(instanceF); arrowsOn(instanceF, selectorF); },
    //    onEnd: function () { overlayOff(); captionOff(); closeButtonOff(); arrowsOff(); activityIndicatorOff(); },
    //    onLoadStart: function () { captionOff(); activityIndicatorOn(); },
    //    onLoadEnd: function () { captionOn(); activityIndicatorOff(); $j('.imagelightbox-arrow').css('display', 'block'); }
    //});

    //	WITH ARROWS, CAPTION, OVERLAY & ACTIVITY INDICATION

    var selectorG = 'a[data-imagelightbox="f"]';
    var instanceG = $j(selectorG).imageLightbox(
    {
        onStart: function () { arrowsOn(instanceG, selectorG); overlayOn(); closeButtonOn(instanceG); },
        onEnd: function () { arrowsOff(); activityIndicatorOff(); captionOff(); overlayOff(); closeButtonOff(); },
        onLoadStart: function () { activityIndicatorOn(); captionOff(); },
        onLoadEnd: function () { $j('.imagelightbox-arrow').css('display', 'block'); activityIndicatorOff(); captionOn(); }
    });

});
