# KeystoneJS | Watch on Start Plugin
> Automatically trigger watch updates on Model initialization.

### Installation

```
npm install --save git://github.com/onenorth/keystone-watch-on-start.git#1.0.0
```

### Description

This plugin enables watch events to trigger when a KeystoneJS model is initialized.

This is useful when you want to create a computed KeystoneJS field value on save, but you have existing items in your database.

For example, adding in a `slug` after creating 4 items requires us to manually save those 4 items to generate the `slug` value.

Not anymore, my dudes!


### Example Usage


__`Person.js`__

```js
const keystone = require('keystone')

// 1. Include the `watchOnStart` option
const List = keystone.List('Person', {
  watchOnStart: true
})

// 2. Add in your fields.
List.add({
  name: {
    type: String
  },
  angryName: {
    watch: true, // 3. Specify watcher fields
    type: String,
    noedit: true,
    value: function () {
      return this.name != null
        ? this.name.toUpperCase() + '!'
        : undefined
    }
  }
})

// 4. Register your list.
List.register()
```


__`keystone.js`__

```js
const keystone = require('keystone')
const watchOnStart = require('keystone-watch-on-start')

// 1. Initialize KeystoneJS
keystone.init( /* ... */ )

// 2. Initialize this plugin
watchOnStart.init({ keystone })

// 3. Include your Models
keystone.import('models')

// 4. Start KeystoneJS
keystone.start()
```

Any existing items will have `angryName` set (if `name` is defined).