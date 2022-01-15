/*!
* zeynepjs v2.2.0
* A light-weight multi-level jQuery side menu plugin.
* It's fully customizable and is compatible with modern browsers such as Google Chrome, Mozilla Firefox, Safari, Edge and Internet Explorer
* MIT License
* by Huseyin ELMAS
*/
(function ($, pluginName) {
  var defaults = {
    htmlClass: true
  }

  function Plugin (element, options) {
    this.element = element
    this.eventController = eventController
    this.options = $.extend({}, defaults, options)
    this.options.initialized = false

    this.init()
  }

  Plugin.prototype.init = function () {
    var zeynep = this.element
    var options = this.options
    var eventController = this.eventController.bind(this)

    // exit if already initialized
    if (options.initialized === true) return

    eventController('loading')

    // handle subMenu links/triggers click events
    zeynep.find('[data-submenu]').on('click', function (event) {
      event.preventDefault()

      var self = $(this)
      var subMenuId = self.attr('data-submenu')
      var subMenuEl = $('#' + subMenuId)

      // if subMenu not found, do nothing
      if (!subMenuEl.length) return

      var eventDetails = {
        subMenu: true,
        menuId: subMenuId
      }

      eventController('opening', eventDetails)

      // open the subMenu
      zeynep.find('.submenu.current').removeClass('current')
      subMenuEl.addClass('opened current')
      !zeynep.hasClass('submenu-opened') && zeynep.addClass('submenu-opened')

      // scroll to top before submenu transition
      zeynep[0].scrollTo({ top: 0 })

      eventController('opened', eventDetails)
    })

    // handle subMenu closers click events
    zeynep.find('[data-submenu-close]').on('click', function (event) {
      event.preventDefault()

      var self = $(this)
      var subMenuId = self.attr('data-submenu-close')
      var subMenuEl = $('#' + subMenuId)

      // if subMenu not found, do nothing
      if (!subMenuEl.length) return

      var eventDetails = {
        subMenu: true,
        menuId: subMenuId
      }

      eventController('closing', eventDetails)

      // close subMenu
      subMenuEl.removeClass('opened current')
      zeynep.find('.submenu.opened').last().addClass('current')
      !zeynep.find('.submenu.opened').length && zeynep.removeClass('submenu-opened')

      // scroll to top between submenu transitions
      subMenuEl[0].scrollTo({ top: 0 })

      eventController('closed', eventDetails)
    })

    eventController('load')

    // zeynepjs successfully initialized
    this.options.htmlClass && !$('html').hasClass('zeynep-initialized') && $('html').addClass('zeynep-initialized')

    options.initialized = true
  }

  Plugin.prototype.open = function () {
    this.eventController(
      'opening',
      { subMenu: false }
    )

    // zeynepjs menu is opened
    this.element.addClass('opened')
    this.options.htmlClass && $('html').addClass('zeynep-opened')

    this.eventController(
      'opened',
      { subMenu: false }
    )
  }

  Plugin.prototype.close = function (disableEvent) {
    !disableEvent && this.eventController('closing', { subMenu: false })

    // zeynepjs menu is opened
    this.element.removeClass('opened')
    this.options.htmlClass && $('html').removeClass('zeynep-opened')

    !disableEvent && this.eventController('closed', { subMenu: false })
  }

  Plugin.prototype.destroy = function () {
    this.eventController('destroying')

    // close the menu without firing any event
    this.close(true)

    // close submenus
    this.element.find('.submenu.opened').removeClass('opened')

    // clear/remove the instance on the element
    this.element.removeData(pluginName)

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

  var eventController = function (type, details) {
    if (!this.options[type]) return
    if (typeof this.options[type] !== 'function') throw Error('event handler must be a function: ' + type)

    // call the event
    this.options[type].call(this, this.element, this.options, details)
  }

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

  var eventBinder = function (name, handler) {
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

    return instance
  }
})(window.jQuery || window.cash, 'zeynep')
