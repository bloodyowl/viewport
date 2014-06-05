# viewport

[![browser support](https://ci.testling.com/bloodyowl/viewport.png)
](https://ci.testling.com/bloodyowl/viewport)

viewport based router

## install

```sh
$ npm install bloody-viewport
```

## require

```javascript
var viewport = require("bloody-viewport")
```

## api


### `viewport() > v`

creates a viewport router

`v` defines a viewport instance


### `v.use(options) > v`

#### options

##### `range {Array}`

array containing the viewport boundaries (eg. `[0, 310]` means `0 <= viewport <= 310`).

##### `on {Function}`

callback when arriving within the given viewport boundaries.

##### `off {Function}`

callback when leaving the given viewport boundaries.

### `v.init() > v`

inits `v` (to use after having your ranges configured),
executes the right callbacks and starts listening to `window` resizes.

### `v.update(viewportWidth {Number}) > v`

Executes the callbacks matching `viewportWidth`.

### `v.destroy()`

Removes all ranges and stops listening to resizes.

## examples

```javascript
var viewport = require("bloody-viewport")
var router = viewport()

router
  .use({
    // viewport <= 320
    range : [0, 320],
    on : function(){
      mobileHeader.init()
    },
    off : function(){
      mobileHeader.destroy()
    }
  })
  .use({
    // 240 <= viewport <= 768
    range : [240, 768],
    on : function(){
      sideNav.init()
    },
    off : function(){
      sideNav.destroy()
    }
  })
  .use({
    // viewport > 1024
    range : [1024, Infinity],
    on : function(){
      backgroundResizer.init()
    },
    off : function(){
      backgroundResizer.destroy()
    }
  })
  .init()
```
