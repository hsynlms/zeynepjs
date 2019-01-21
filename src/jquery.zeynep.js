(function ($) {
	// create the defaults
	var pluginName = 'zeynep';
	var defaults = {
		initialized: false,
		speed: 375,
		disableTransition: false,
		width: 295,
		onLoading: null,
		onLoad: null,
		onOpening: null,
		onOpened: null,
		onClosing: null,
		onClosed: null,
		onUnloading: null,
		onUnloaded: null
	};

	// the actual plugin constructor
	function Plugin(element, options) {
		this.element = element;

		// jQuery has an extend method that merges the 
		// contents of two or more objects, storing the 
		// result in the first object. the first object 
		// is generally empty because we don't want to alter 
		// the default options for future instances of the plugin
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.eventController = eventController;

		this.init();
	}

	Plugin.prototype.init = function () {
		// place initialization logic here
		// you already have access to the DOM element and
		// the options via the instance, e.g. this.element 
		// and this.options
		var zeynep = this.element;
		var submenuTriggers = zeynep.find('[data-submenu]');
		var options = this.options;

		// exit if already initialized
		if (options.initialized) return;

		// run onLoading event
		this.eventController("onLoading");

		this.element.css('transform', 'translateX(-' + this.options.width + 'px)');
		this.element.css('width', this.options.width);

		submenuTriggers.each(function () {
			var _this = $(this);
			var subMenuId = _this.attr('data-submenu');
			var submenuEl = $('#' + subMenuId);

			if (!submenuEl.length) return true;

			_this.on('click', function (event) {
				var scrollTop = submenuEl.parents('.submenu:first').scrollTop() || 0;

				if (!zeynep.find('.submenu.opened').length) {
					zeynep.css('overflow-y', 'hidden');

					scrollTop = zeynep.scrollTop();
				}

				submenuEl.parents('.submenu:first').css('overflow-y', 'hidden');
				submenuEl.scrollTop(0);
				submenuEl.css('top', scrollTop);
				submenuEl.css('transform', 'translateX(0)');
				submenuEl.addClass('opened');
			});

			submenuEl.find('[data-submenu-close="' + subMenuId + '"]').on('click', function (event) {
				submenuEl.parents('.submenu:first').css('overflow-y', '');
				submenuEl.css('transform', 'translateX(' + options.width + 'px)');
				submenuEl.removeClass('opened');

				if (!zeynep.find('.submenu.opened').length) {
					zeynep.css('overflow-y', '');
				}
			});
		});

		options.initialized = true;

		// run onLoad event
		this.eventController("onLoad");
	};

	Plugin.prototype.open = function () {
		// you already have access to the DOM element and
		// the options via the instance, e.g. this.element 
		// and this.options

		// run onOpening event
		this.eventController("onOpening");

		var html = $('html');
		var body = $('body');

		this.options.disableTransition && this.element.add(html).addClass('no-transition');

		html.addClass('zeynep-opened');
		
		this.element.css('transform', 'translateX(0)');
		body.css('left', this.options.width);

		// run onOpened event
		this.eventController("onOpened");
	};

	Plugin.prototype.close = function (disableEvent) {
		// you already have access to the DOM element and
		// the options via the instance, e.g. this.element 
		// and this.options

		// run onClosing event
		!disableEvent && this.eventController("onClosing");

		var html = $('html');
		var body = $('body');

		html.removeClass('zeynep-opened');
		body.css('left', 0);
		this.element.css('transform', 'translateX(-' + this.options.width + 'px)');

		this.options.disableTransition && this.element.add(html).removeClass('no-transition');

		// run onClosed event
		!disableEvent && this.eventController("onClosed");
	};

	Plugin.prototype.unload = function () {
		// you already have access to the DOM element and
		// the options via the instance, e.g. this.element 
		// and this.options

		// run onUnloading event
		this.eventController("onUnloading");

		// close the menu
		this.close(true);

		this.element.removeAttr('style');
		this.element.find('.submenu.opened').removeClass('opened');
		this.element.find('.submenu').removeAttr('style');

		$.removeData(this.element, 'plugin_' + pluginName);

		// run onUnloaded event
		this.eventController("onUnloaded");
	};

	// event executor
	var eventController = function (type) {
		// even type validation
		if (!this.options[type] || typeof this.options[type] !== "function") return;

		// execute the event if it is provided
		switch (type) {
			case "onLoading":
				this.options.onLoading.call();
				break;
			case "onLoad":
				this.options.onLoad.call();
				break;
			case "onOpening":
				this.options.onOpening.call();
				break;
			case "onOpened":
				this.options.onOpened.call();
				break;
			case "onClosing":
				this.options.onClosing.call();
				break;
			case "onClosed":
				this.options.onClosed.call();
				break;
			case "onUnloading":
				this.options.onUnloading.call();
				break;
			case "onUnloaded":
				this.options.onUnloaded.call();
				break;
		}
	};

	// get the element instance
	var getInstance = function (element, options) {
		var _instance = null;
		var _options = options || {};

		if (!element.data(pluginName)) {
			_instance = new Plugin(element, _options);

			element.data(pluginName, _instance);
		} else {
			_instance = element.data(pluginName);
		}

		return _instance;
	};
	
	// a really lightweight plugin wrapper around the constructor, 
	// preventing against multiple instantiations
	$.fn[pluginName] = function (options) {
		var zeynep = this;

		// prevent multiple load
		if (zeynep.length > 1) return null;

		var instance = getInstance(zeynep, options);

		return {
			load: function () {
				instance.init.apply(instance);
			},
			open: function () {
				instance.open.apply(instance);
			},
			close: function () {
				instance.close.apply(instance);
			},
			unload: function () {
				instance.unload.apply(instance);
			}
		};
	}
})(window.jQuery);
