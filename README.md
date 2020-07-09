# zeynepjs
> A lightweight multi-level jQuery side menu plugin.

[![NPM](https://nodei.co/npm/zeynepjs.png)](https://nodei.co/npm/zeynepjs/)

zeynepjs can be initialized for any existing HTML element and supports multi-level nested submenus. It's customizable by CSS and options.

**Note:** There are a lot of breaking changes so `v2.x` is not compatible with `v1.x`.

## Options

| Option            | Type     | Default | Description  |
| ---               | ---      | ---     | ---          |
| htmlClass         | boolean  | true    | If `true` zeynepjs will add some classes to `<html>` element like `zeynep-initialized`, `zeynep-opened` |

## Events

| Name              | Description                            |
| ---               | ---                                    |
| loading           | Fired when the menu is being loaded    |
| load              | Fired when the menu is loaded          |
| opening           | Fired when the menu is being opened    |
| opened            | Fired when the menu is opened          |
| closing           | Fired when the menu is being closed    |
| closed            | Fired when the menu is closed          |
| destroying        | Fired when the menu is being destroyed |
| destroyed         | Fired when the menu is destroyed       |

> Events can also be defined in options.

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

## Contribution
Contributions and pull requests are kindly welcomed!

## License
This project is licensed under the terms of the [MIT license](https://github.com/hsynlms/zeynepjs/blob/master/LICENSE).
