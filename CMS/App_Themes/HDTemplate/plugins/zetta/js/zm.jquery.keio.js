/**
 * @name jQuery plugin Zetta Menu 1.1
 * @author nK http://codecanyon.net/user/nKdev
 * @description Zetta Menu - mega dropdown menu plugin.
 *
 * @similar Pure CSS3 Zetta Menu - http://codecanyon.net/item/zetta-menu-css3-mega-drop-down-menu/7667949?ref=nKdev
 */
(function($) {
	var zmId = 0,
		prefixes = {};

	// animation test
	$.extend($.support, {
	  animation: (function() {
    	if(window.opera && opera.toString() == "[object Opera]") {
    		return; }
	    var animation = false,
	      animationstring = 'animation',
	      keyframeprefix = '',
	      domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
	      pfx  = '',
	      elm = document.createElement('div');

	    if( elm.style.animationName !== undefined ) { animation = true; }

	    if( animation === false ) {
	      for( var i = 0; i < domPrefixes.length; i++ ) {
	        if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
	          pfx = domPrefixes[ i ];
	          animationstring = pfx + 'Animation';
	          keyframeprefix = '-' + pfx.toLowerCase() + '-';
	          animation = true;
	          break;
	        }
	      }
	    }
	    return animation;
	  }())
	});

	// check meta tag
	if(!$('meta[name=viewport]')[0]) {
		$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">');
	}

	$.fn.zettaMenu = function(method) {
		var namespace = 'zettaMenu';

		// plugin class that does all work
		window[namespace] = function(obj, settings) {
			var base = this;

			base.id = zmId;
			zmId++;
			// default settings
			base.settings = {
				position: '', // left, right, bottom [other values - top position]
				fixed: false,
				sticky: false,
				fullWidth: true,
				responsive: 'switch', // simple, switch[-margin], stack[-margin]
				showOn: 'click', // hover, click, toggle
				effect: {
					name: 'fade', // fade, slide[-top, -bottom, -left, -right]
					speed: 500, // animation speed (ms)
					delay: 200, // delay between animation (ms)
					easing: 'ease' // easing function, can use cubic-bezier()
				}
			}

			// extending with settings parameter
			if (settings) {
				for(var k in settings) {
					if(typeof settings[k] == 'object') {
						$.extend(base.settings[k], settings[k]);
					} else {
						base.settings[k] = settings[k];
					}
				}
			}

			base.obj = obj; // actual DOM element
			base.$obj = $(obj); // jQuery version of DOM element
			base.$liDrop = $('li > ul, li > div', base.$obj).parent().find('> a'); // li with drop children

			// init method
			var _init = function () {
				// replace special zm tags
				$('[zm-size]', base.$obj).each(function(){$(this).css('width', $(this).attr('zm-size'))});
				// base.$obj.html().replace(/zm-size=\"(.*?)\"/gim, 'style=\"width: $1px\"');

				// set ID
				base.$obj.addClass('zm-js-'+base.id);

				// set position menu
				if(base.settings.position == 'left' || base.settings.position == 'right' || base.settings.position == 'bottom')
					base.$obj.addClass('zm-position-'+base.settings.position);

				// set fixed menu
				if(base.settings.fixed)
					base.$obj.addClass('zm-fixed');

				// set full width
				if(base.settings.fullWidth)
					base.$obj.addClass('zm-full-width');

				// add responsive
				if(base.settings.responsive) {
					var rType = base.settings.responsive;

					if(rType == 'stack-margin' || rType == 'switch-margin') {
						base.$obj.addClass('zm-response-margin');
						rType = rType.replace('-margin', '');
					}

					base.$obj.addClass('zm-response-'+rType);
				}

				if(!base.settings.effect) {
					base.settings.effect = {
						name: 'fade',
						speed: 0,
						delay: 0,
						easing: 'linear'
					}
				}

				// set effect
				base.$styles = $(setEffect(base.settings.effect.name));
				base.$obj.after(base.$styles);

				// call to bind events on DOM element
				_bindEvents();
			}

			var setEffect = function(effect) {
				var showFrom = {
							opacity: 0
						},
						showTo = {
							opacity: 1
						};
				switch(effect) {
					case 'slide-top':
						showFrom['transform'] = 'translateY(50px)';
						showFrom['-webkit-transform'] = 'translateY(50px)';
						break;
					case 'slide-bottom':
						showFrom['transform'] = 'translateY(-50px)';
						showFrom['-webkit-transform'] = 'translateY(-50px)';
						break;
					case 'slide-left':
						showFrom['transform'] = 'translateX(50px)';
						showFrom['-webkit-transform'] = 'translateX(50px)';
						break;
					case 'slide-right':
						showFrom['transform'] = 'translateX(-50px)';
						showFrom['-webkit-transform'] = 'translateX(-50px)';
						break;
				}

				$.keyframe.define([{
			    name: 'zm-show',
			    'from': showFrom,
			    'to': showTo
				}]);
				$.keyframe.define([{
			    name: 'zm-hide',
			    'from': showTo,
			    'to': showFrom
				}]);

				var style = [
					'<style>',
						'.zetta-menu.zm-js-'+base.id+' > li > div,',
						'.zetta-menu.zm-js-'+base.id+' li > ul,',
						'.zetta-menu.zm-js-'+base.id+' > li:hover > div,',
						'.zetta-menu.zm-js-'+base.id+' li:hover > ul {',
							'display: none;',
							'z-index: -1;',
						'}',
						'.zetta-menu.zm-js-'+base.id+' > li.zm-opened > div,',
						'.zetta-menu.zm-js-'+base.id+' li.zm-opened > ul {',
							'display: block;',
							'z-index: 20;',
						'}',
					'</style>'
				].join('');

				return style;
			}

			// public destroy method
			base.destroy = function() {
				// unbind events
				base.$liDrop.off('.' + namespace);
				base.$liDrop.parent().off('.' + namespace);
				$(document).off('.' + namespace);

				// remove custom styles
				if(base.$styles) base.$styles.remove();

				// remove classes
				base.$obj.removeClass('zm-js-'+base.id);
				base.$obj.removeClass('zm-position-'+base.settings.position);
				if(base.settings.fixed)
					base.$obj.removeClass('zm-fixed');
				if(base.settings.fullWidth)
					base.$obj.removeClass('zm-full-width');
				if(base.settings.responsive)
					base.$obj.removeClass('zm-response-'+base.settings.responsive);

				// object destruction
				base.$obj.removeData(namespace);
				delete base;
			}

			// plugin events
			var _bindEvents = function() {
				function animationShow(item) {
					item = item.addClass('zm-opened').find('> div, > ul');
                  if(base.settings.effect.speed && $.support.animation) {
                    item.playKeyframe([{
                      name: 'zm-show',
                      duration: base.settings.effect.speed + 'ms',
                      timingFunction: base.settings.effect.easing
                    }], function() {
                      $(this).resetKeyframe();
                    });
                  }
				}
				function animationHide(item) {
					item = item.find('> div, > ul');
                    if(base.settings.effect.speed && $.support.animation) {
                        item.playKeyframe([{
                            name: 'zm-hide',
                            duration: base.settings.effect.speed + 'ms',
                            timingFunction: base.settings.effect.easing
                        }], function(){
                            $(this).resetKeyframe();
                            $(this).parent().removeClass('zm-opened');
                        });
                    } else {
						item.parent().removeClass('zm-opened');
					}
				}

				// click events
				if(base.settings.showOn == 'click') {
					base.$liDrop.on('click.' + namespace, function(e) {
						var li = $(this).parent();
						setTimeout(function($this) {
							if($this.parent().find("> :hover")[0] != $this[0]) return;
							if($this.hasClass('zm-opened')) {
								animationHide($this);
							} else {
								animationShow($this);
							}
						}.bind(this, li), base.settings.effect.delay);
						animationHide(li.siblings('.zm-opened'));

                        if(!li.hasClass('zm-opened')) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
					});
				}
				// toggle events
				else if(base.settings.showOn == 'toggle') {
					base.$liDrop.on('click.' + namespace, function(e) {
						var li = $(this).parent();
						setTimeout(function($this) {
							if($this.parent().find("> :hover")[0] != $this[0]) return;
							if($this.hasClass('zm-opened')) {
								animationHide($this);
							} else {
								animationShow($this);
							}
						}.bind(this, li), base.settings.effect.delay);
						animationHide(li.siblings('.zm-opened'));

                        if(!li.hasClass('zm-opened')) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
					});
				}
				// hover events
				else {
				    base.$liDrop.on('mouseenter.' + namespace + ' click.' + namespace, function (e) {
						var li = $(this).parent();
						// add opened class and prevent follow a link
						if(!li.hasClass('zm-opened')) {
							setTimeout(function($this) {
								if($this.parent().find("> :hover")[0] != $this[0]) return;
								animationShow($this);
							}.bind(this, li), base.settings.effect.delay);
							e.preventDefault();
							e.stopPropagation();
						}
					});
				}

				if(base.settings.showOn == 'click' || base.settings.showOn == 'hover') {
					base.$liDrop.parent().on('mouseleave.' + namespace, function() {
						// intent
						setTimeout(function($this) {
							if($this.parent().find("> :hover")[0] == $this[0]) return;
							animationHide($this);
						}.bind(this, $(this)), base.settings.effect.delay);
					});
				}

				$(document).on('click.' + namespace + ' touchstart.' + namespace, function(e) {
					// remove opened classes when clicking on document
					if(!$(e.target).parents('.zm-js-'+base.id).length)
						animationHide(base.$liDrop.parent());
				});

				// sticky menu
				if(base.settings.sticky && !base.settings.fixed) {
					var zmHeight = base.$obj.outerHeight(true),
						zmPos = base.$obj.offset(),
						wndH = $(window).height();

					$(window).on('scroll.' + namespace, function() {
						var stickyOn =
							(base.settings.position != 'bottom' && $(this).scrollTop() >= zmPos.top)
							|| (base.settings.position == 'bottom' && $(this).scrollTop() + wndH <= zmPos.top + zmHeight);

						if(stickyOn)
							base.$obj.addClass('zm-fixed');
						else
							base.$obj.removeClass('zm-fixed');
					}).scroll();
				}
			}

			// calling init
			_init();
		}

		// Method calling logic
		return this.each(function() {
			if (typeof $(this).data(namespace) == 'undefined') {
				// Create plugin for this element
				$(this).data(namespace, new window[namespace](this, method));
			} else if (typeof $(this).data(namespace) == 'object' && typeof method == 'undefined') {
				$.error('This element already has jQuery.' + namespace);
			} else if (typeof $(this).data(namespace) == 'object' && typeof $(this).data(namespace)[method] == 'function') {
				// Element has a plugin and method, call it
				$(this).data(namespace)[method].apply(this, Array.prototype.slice.call(arguments, 1));
			} else {
				$.error('Method ' + method + ' does not exist on jQuery.' + namespace);
			}
		});
	}
})(jQuery);

/*!
	jQuery.Keyframes
	https://github.com/jQueryKeyframes/jQuery.Keyframes

	some changes by nK
*/
(function() {
    var $ = jQuery,
    		animationSupport = false,
    		animationString = 'animation',
    		prefix = '',
        vendorPrefix = '',
        domPrefixes = ['Webkit', 'Moz', 'O', 'ms', 'Khtml'];

    (function(){
        var item = $('<div>')[0];
        if( item.style.animationName !== undefined ) {
        	animationSupport = true; return; }

        for( var i = 0; i < domPrefixes.length; i++ ) {
          if( item.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
            prefix = domPrefixes[ i ];
            animationString = prefix + 'Animation';
            vendorPrefix = '-' + prefix.toLowerCase() + '-';
            animationSupport = true;
            return;
          }
        }
        animationSupport = false;
    }());


    var $createKeyframeStyleTag = function(id) {
      return $("<style>").attr({
        'class': "keyframe-style",
        id: id,
        type: "text/css"
      }).appendTo("head");
    };

    $.keyframe = {
        getVendorPrefix: function() {
            return vendorPrefix;
        },
        isSupported: function() {
            return animationSupport;
        },
        generate: function(frameData) {
        	if(animationSupport) {
            var frameName = frameData.name || "";
            var css = "@" + vendorPrefix + "keyframes " + frameName + " {";

            for (var key in frameData) {
                if (key !== "name") {
                    css += key + " {";

                    for (var property in frameData[key]) {
                        css += property + ":" + frameData[key][property] + ";";
                    }

                    css += "}";
                }
            }

            css += "}";

            var $frameStyle = $("style#" + frameData.name);

            if ($frameStyle.length > 0) {
                $frameStyle.html(css);

                var $elems = $("*").filter(function() {
                    this.style[animationString + "Name"] === frameName;
                });

                $elems.each(function() {
                    var $el, options;
                    $el = $(this);
                    options = $el.data("keyframeOptions");
                    $el.resetKeyframe(function() {
                        $el.playKeyframe(options);
                    });
                });
            } else {
              $createKeyframeStyleTag(frameName).append(css);
            }
          }
        },
        define: function(frameData) {
            if (frameData.length) {
                for (var i = 0; i < frameData.length; i++) {
                    var frame = frameData[i];
                    this.generate(frame);
                }
            } else {
                this.generate(frameData);
            }
        }
    };

    var animationPlayState = "animation-play-state";
    var playStateRunning = "running";

    $.fn.resetKeyframe = function(callback) {
        var $el = $(this).css(vendorPrefix + animationPlayState, playStateRunning).css(vendorPrefix + "animation", "none");

        if (callback) {
            setTimeout(callback, 1);
        }
    };

    $.fn.pauseKeyframe = function() {
        $(this).css(vendorPrefix + animationPlayState, "paused");
    };

    $.fn.resumeKeyframe = function() {
        $(this).css(vendorPrefix + animationPlayState, playStateRunning);
    };

    $.fn.playKeyframe = function(frameOptions, callback) {
        var animObjToStr = function(obj){
            obj = $.extend({
                duration: '0ms',
                timingFunction: "ease",
                delay: '0ms',
                iterationCount: 1,
                direction: "normal",
                fillMode: "forwards"
            }, obj);
            return [obj.name, obj.duration, obj.timingFunction, obj.delay, obj.iterationCount, obj.direction, obj.fillMode].join(" ");
        };

        var animationcss = "";

        if($.isArray(frameOptions)){
            var frameOptionsStrings = [];
            for(var i = 0; i < frameOptions.length; i++){
                if (typeof frameOptions[i] === 'string') {
                    frameOptionsStrings.push(frameOptions[i]);
                }else{
                    frameOptionsStrings.push(animObjToStr(frameOptions[i]));
                }
            }
            animationcss = frameOptionsStrings.join(", ");
        }else if (typeof frameOptions === 'string') {
            animationcss = frameOptions;
        }else{
            animationcss = animObjToStr(frameOptions);
        }

        var animationkey = vendorPrefix + "animation";
        var pfx = ["webkit", "moz", "MS", "o", ""];

        var _prefixEvent = function(element, type, callback) {
            for(var i = 0; i < pfx.length; i++){
                if (!pfx[i]) {
                    type = type.toLowerCase();
                }
                var evt = pfx[i] + type;
                element.off(evt).on(evt, callback);
            }
        };

        this.each(function() {
            var $el = $(this).addClass("boostKeyframe").css(vendorPrefix + animationPlayState, playStateRunning).css(animationkey, animationcss).data("keyframeOptions", frameOptions);

            if (callback) {
                _prefixEvent($el, 'AnimationIteration', callback);
                _prefixEvent($el, 'AnimationEnd', callback);
            }
        });
        return this;
    };

    if(animationSupport) {
    	$createKeyframeStyleTag("boost-keyframe").append(" .boostKeyframe{" + vendorPrefix + "transform:scale3d(1,1,1);}");
		}

}).call(this);

// bind polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var o=Array.prototype.slice.call(arguments,1),n=this,r=function(){},i=function(){return n.apply(this instanceof r&&t?this:t,o.concat(Array.prototype.slice.call(arguments)))};return r.prototype=this.prototype,i.prototype=new r,i});
