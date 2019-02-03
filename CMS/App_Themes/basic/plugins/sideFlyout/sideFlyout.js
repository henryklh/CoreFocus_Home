(function ($) {

    function sideFlyoutify() {

        var defaultOpenWidth = 1900;
        var expandAttr = 'aria-expanded';
        var togglerClass = '.flyout-toggler';

        var close = function (flyout) {
            $(flyout).attr(expandAttr, false);
            $(flyout).removeClass('in');
            $(flyout).find(togglerClass).removeClass('active');
        };

        var open = function (flyout) {
            $(flyout).attr(expandAttr, true);
            $(flyout).addClass('in');
            $(flyout).find(togglerClass).addClass('active');
        };

        var toggle = function (flyout) {
            var isOpen = $(flyout).hasClass('in');

            if (isOpen) {
                close(flyout);
            }
            else {
                open(flyout);
            }
        };

        var self = this;

        $(this).find('.flyout-toggler').click(function (e) {
            toggle(self);
            e.preventDefault();
        });

        // initial

        if ($(this).attr(expandAttr) == 'true') {
            if ($(window).width() >= defaultOpenWidth) {
                open(self);
            }
            else {
                close(self);
            }
        }
        else {
            close(self);
        }

    }

    $.fn.extend({
        sideFlyout: function () {
            sideFlyoutify.call(this);
        }
    });

}(jQuery));