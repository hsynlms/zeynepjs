# zeynepjs
> A lightweight multi-level jQuery side menu plugin.

[![NPM](https://nodei.co/npm/zeynepjs.png)](https://nodei.co/npm/zeynepjs/)

zeynepjs can be initialized for any existing HTML element and supports multi-level nested submenus. It's customizable by CSS and options.

# Options

| Option            | Type     | Default | Description  |
| ---               | ---      | ---     | ---          |
| disableTransition | boolean  | false   | Adds `no-transition` CSS class to the initialized HTML menu element |
| width             | int      | 295     | Menu element width in `pixel` for animation |
| onLoading         | function | null    | Triggered before loading the menu |
| onLoad            | function | null    | Triggered when the menu is loaded |
| onOpening         | function | null    | Triggered before opening the menu |
| onOpened          | function | null    | Triggered when the menu is opened |
| onClosing         | function | null    | Triggered before closing the menu |
| onClosed          | function | null    | Triggered when the menu is closed |
| onUnloading       | function | null    | Triggered before unloading/destroying the menu |
| onUnloaded        | function | null    | Triggered when the menu is unloaded/destroyed |

```js
// initialize zeynepjs
var zeynep = $('.zeynep').zeynep({
  disableTransition: true,
  onClosed: function () {
    // enable main wrapper element clicks on any its children element
    $("body main").attr("style", "");

    console.log('the side menu is closed.');
  },
  onOpened: function () {
    // disable main wrapper element clicks on any its children element
    $("body main").attr("style", "pointer-events: none;");

    console.log('the side menu is opened.');
  }
});
```

# Events

Events can be invoked after the menu initialized.

| Option            | Description  |
| ---               | ---          |
| open              | Opens the menu |
| close             | Closes the menu |
| unload            | Unloads/destroys the menu |

```js
// initialize zeynepjs and get the instance into a variable
var zeynep = $('.zeynep').zeynep();

// opens the menu
zeynep.open();

// closes the menu
zeynep.close();

// unloads/destroys the menu
zeynep.unload();
```
    
# License
This project is licensed under the terms of the [MIT license](https://github.com/hsynlms/zeynepjs/blob/master/LICENSE).
