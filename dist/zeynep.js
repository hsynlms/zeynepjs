/*!
* zeynepjs v1.0.2
* A light-weight multi-level jQuery side menu plugin.
*
* Author: Huseyin ELMAS
*/
(function ($, pluginName) {
  // plugin defaults
  var defaults = {
    htmlClass: true
  }

  // plugin constructor
  function Plugin (element, options) {
    this.element = element
    this.eventController = eventController

    // merge defaults with options
    this.options = $.extend({}, defaults, options)
    this.options.initialized = false

    // initialize the plugin
    this.init()
  }

  Plugin.prototype.init = function () {
    var zeynep = this.element
    var options = this.options

    // exit if already initialized
    if (options.initialized === true) return

    // loading event
    this.eventController('loading')

    // handle subMenu links/triggers click events
    zeynep.find('[data-submenu]').on('click', function (event) {
      event.preventDefault()

      var self = $(this)
      var subMenuId = self.attr('data-submenu')
      var subMenuEl = $('#' + subMenuId)

      // if subMenu not found, do nothing
      if (!subMenuEl.length) return

      // open subMenu
      zeynep.find('.submenu.current').removeClass('current')
      subMenuEl.addClass('opened current')
      !zeynep.hasClass('submenu-opened') && zeynep.addClass('submenu-opened')
    })

    // handle subMenu closers click events
    zeynep.find('[data-submenu-close]').on('click', function (event) {
      event.preventDefault()

      var self = $(this)
      var subMenuId = self.attr('data-submenu-close')
      var subMenuEl = $('#' + subMenuId)

      // if subMenu not found, do nothing
      if (!subMenuEl.length) return

      // close subMenu
      subMenuEl.removeClass('opened current')
      zeynep.find('.submenu.opened:last').addClass('current')
      !zeynep.find('.submenu.opened').length && zeynep.removeClass('submenu-opened')

      subMenuEl.scrollTop(0)
    })

    // onLoad event
    this.eventController('load')

    // zeynepjs successfully initialized
    this.options.htmlClass && !$('html').hasClass('zeynep-initialized') && $('html').addClass('zeynep-initialized')

    options.initialized = true
  }

  Plugin.prototype.open = function () {
    // opening event
    this.eventController('opening')

    // zeynepjs menu is opened
    this.element.addClass('opened')
    this.options.htmlClass && $('html').addClass('zeynep-opened')

    // opened event
    this.eventController('opened')
  }

  Plugin.prototype.close = function (disableEvent) {
    // closing event
    !disableEvent && this.eventController('closing')

    // zeynepjs menu is opened
    this.element.removeClass('opened')
    this.options.htmlClass && $('html').removeClass('zeynep-opened')

    // closed event
    !disableEvent && this.eventController('closed')
  }

  Plugin.prototype.destroy = function () {
    // destroying event
    this.eventController('destroying')

    // close the menu
    this.close(true)

    // close submenus
    this.element.find('.submenu.opened').removeClass('opened')

    // clear/remove the instance on the element
    this.element.removeData(pluginName)

    // destroyed event
    this.eventController('destroyed')

    // reset options
    this.options = defaults

    this.options.htmlClass && $('html').removeClass('zeynep-initialized')

    delete this.element
    delete this.options
    delete this.eventController
  }

  Plugin.prototype.on = function (name, handler) {
    eventBinder.call(this, name, handler)
  }

  // event executor
  var eventController = function (type) {
    // validations
    if (!this.options[type]) return
    if (typeof this.options[type] !== 'function') throw Error('event handler must be a function: ' + type)

    // call the event
    this.options[type].call(this, this.element, this.options)
  }

  // get the element instance
  var getInstance = function (element, options) {
    var instance = null

    if (!element.data(pluginName)) {
      // zeynepjs is not initialized for the element
      // crceate a new instance
      instance = new Plugin(element, options || {})

      // put the instance on element
      element.data(pluginName, instance)
    } else {
      // return the already initialized instance
      instance = element.data(pluginName)
    }

    return instance
  }

  // dynamically event binder
  var eventBinder = function (name, handler) {
    // validations
    if (typeof name !== 'string') throw Error('event name is expected to be a string but got: ' + typeof name)
    if (typeof handler !== 'function') throw Error('event handler is not a function for: ' + name)

    // update options
    this.options[name] = handler
  }

  // a really lightweight plugin wrapper around the constructor
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    // get a zeynepjs instance
    var instance = getInstance($(this[0]), options)

    // return the instance
    return instance
  }
})(window.jQuery, 'zeynep')
