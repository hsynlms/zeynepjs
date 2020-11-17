# zeynepjs
> A lightweight multi-level jQuery side menu plugin.

[![NPM](https://nodei.co/npm/zeynepjs.png)](https://nodei.co/npm/zeynepjs/)

`zeynepjs` is a light-weight multi-level jQuery side menu plugin. It's fully customizable and is compatible with modern browsers such as Google Chrome, Mozilla Firefox, Safari, Edge and Internet Explorer.

## Options

| Option            | Type     | Default | Description  |
| ---               | ---      | ---     | ---          |
| htmlClass         | boolean  | true    | If `true` zeynepjs will add some classes to `<html/>` element like `zeynep-initialized`, `zeynep-opened` |

## Usage

```js
// initialize zeynepjs and get the instance into a variable
var zeynep = $('.zeynep').zeynep({
  load: function (element, options) {
    console.log('zeynepjs menu is successfully loaded')
  }
})

// opens the menu
zeynep.open()

// closes the menu
zeynep.close()

// dynamically event binding
zeynep.on('closing', function () {
  console.log('guys, the side menu is closing')
})

// destroys the menu
zeynep.destroy()
```

## Using with Webpack
Once the library installed in your project, just import it:

```js
import 'zeynepjs'
```

## Methods

`zeynepjs` exposes those:

| Option            | Type     | Parameters                          | Description                                             |
| ---               | ---      | ---                                 | ---                                                     |
| on                | function | `event name` and `handler function` | To dynamically event binding                            |
| open              | function | - | To open the menu                                        |
| close             | function | `disableEvent` (optional) | To close the menu. If `disableEvent` is passed true, no close event will be fired  |
| destroy           | function | - | To destroy the zeynepjs instance on initialized element |

## Events

> Events can also be defined in options.

### `loading(element, options)`

Fired when the menu is being loaded. This event cannot be defined dynamically. It needs to be defined in options.

`element` is the element that zeynepjs is being loaded on.

`options` is the initialized zeynepjs instance options.

### `load(element, options)`

Fired when the menu is loaded. This event cannot be defined dynamically. It needs to be defined in options.

`element` is the element that zeynepjs has been loaded on.

`options` is the initialized zeynepjs instance options.

### `opening(element, options, details)`

Fired when the menu or a sub-menu is being opened.

`element` is the zeynepjs instance element.

`options` is the initialized zeynepjs instance options.

`details` contains a flag which indicates the item that is being opened is the menu or a sub-menu and the sub-menu DOM Element ID.

### `opened(element, options, details)`

Fired when the menu or a sub-menu is opened.

`element` is the zeynepjs instance element.

`options` is the initialized zeynepjs instance options.

`details` contains a flag which indicates the opened item is the menu or a sub-menu and the opened sub-menu DOM Element ID.

### `closing(element, options, details)`

Fired when the menu or a sub-menu is being closed.

`element` is the zeynepjs instance element.

`options` is the initialized zeynepjs instance options.

`details` contains a flag which indicates the item that is being closing is the menu or a sub-menu and the sub-menu DOM Element ID.

### `closed(element, options, details)`

Fired when the menu or a sub-menu is closed.

`element` is the zeynepjs instance element.

`options` is the initialized zeynepjs instance options.

`details` contains a flag which indicates the closed item is the menu or a sub-menu and the closed sub-menu DOM Element ID.

### `destroying(element, options)`

Fired when the menu is being destroyed.

`element` is the zeynepjs instance element.

`options` is the zeynepjs instance options that is being destroyed.

### `destroyed(element, options)`

Fired when the menu is destroyed.

`element` is the destroyed zeynepjs instance element.

`options` is the destroyed zeynepjs instance options.

## Contribution
Contributions and pull requests are kindly welcomed!

## License
This project is licensed under the terms of the [MIT license](https://github.com/hsynlms/zeynepjs/blob/master/LICENSE).
