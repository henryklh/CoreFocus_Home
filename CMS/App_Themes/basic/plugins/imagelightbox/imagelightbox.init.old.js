var $j = jQuery.noConflict();

$j(function () {
    var activityIndicatorOn = function () {
        $j('<div id="imagelightbox-loading"><div></div></div>').appendTo('body');
    },
        activityIndicatorOff = function () {
            $j('#imagelightbox-loading').remove();
        },

        overlayOn = function () {
            $j('<div id="imagelightbox-overlay"></div>').appendTo('body');
        },
        overlayOff = function () {
            $j('#imagelightbox-overlay').remove();
        },

        closeButtonOn = function (instance) {
            $j('<a href="#" id="imagelightbox-close">Close</a>').appendTo('body').on('click touchend', function () { $j(this).remove(); instance.quitImageLightbox(); return false; });
        },
        closeButtonOff = function () {
            $j('#imagelightbox-close').remove();
        },

        captionOn = function () {
            var description = $j('a[href="' + $j('#imagelightbox').attr('src') + '"] img').attr('alt');
            if (description.length > 0)
                $j('<div id="imagelightbox-caption">' + description + '</div>').appendTo('body');
        },
        captionOff = function () {
            $j('#imagelightbox-caption').remove();
        },

        navigationOn = function (instance, selector) {
            var images = $j(selector);
            if (images.length) {
                var nav = $j('<div id="imagelightbox-nav"></div>');
                for (var i = 0; i < images.length; i++)
                    nav.append('<a href="#"></a>');

                nav.appendTo('body');
                nav.on('click touchend', function () { return false; });

                var navItems = nav.find('a');
                navItems.on('click touchend', function () {
                    var $this = $j(this);
                    if (images.eq($this.index()).attr('href') != $j('#imagelightbox').attr('src'))
                        instance.switchImageLightbox($this.index());

                    navItems.removeClass('active');
                    navItems.eq($this.index()).addClass('active');

                    return false;
                })
                .on('touchend', function () { return false; });
            }
        },
        navigationUpdate = function (selector) {
            var items = $j('#imagelightbox-nav a');
            items.removeClass('active');
            items.eq($j(selector).filter('[href="' + $j('#imagelightbox').attr('src') + '"]').index(selector)).addClass('active');
        },
        navigationOff = function () {
            $j('#imagelightbox-nav').remove();
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


    ////	WITH DIRECTION REFERENCE

    //var selectorE = 'a[data-imagelightbox="e"]';
    //var instanceE = $j(selectorE).imageLightbox(
    //{
    //    onStart: function () { navigationOn(instanceE, selectorE); },
    //    onEnd: function () { navigationOff(); activityIndicatorOff(); },
    //    onLoadStart: function () { activityIndicatorOn(); },
    //    onLoadEnd: function () { navigationUpdate(selectorE); activityIndicatorOff(); }
    //});


    //	ALL COMBINED
    //var selectorF = 'a[data-imagelightbox="f"]';
    //var instanceF = $j(selectorF).imageLightbox(
    //{
    //    onStart: function () { overlayOn(); closeButtonOn(instanceF); navigationOn(instanceF, selectorF); },
    //    onEnd: function () { navigationOff(); overlayOff(); captionOff(); closeButtonOff(); activityIndicatorOff(); },
    //    onLoadStart: function () { captionOff(); activityIndicatorOn(); },
    //    onLoadEnd: function () { navigationUpdate(selectorF); captionOn(); activityIndicatorOff(); }
    //});


    var selectorF = 'a[data-imagelightbox="f"]';
    var instanceF = $j(selectorF).imageLightbox(
    {
        onStart: function () { overlayOn(); closeButtonOn(instanceF); },
        onEnd: function () { overlayOff(); captionOff(); closeButtonOff(); activityIndicatorOff(); },
        onLoadStart: function () { captionOff(); activityIndicatorOn(); },
        onLoadEnd: function () { captionOn(); activityIndicatorOff(); }
    });

});