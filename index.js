module.exports = {
  init: ({ keystone }) => {
    const register = keystone.List.prototype.register

    keystone.List.prototype.register = function () {
      const List = this
      const shouldWatchOnStart = List.options.watchOnStart

      // Only do this if the `singleton` option is set:
      if (shouldWatchOnStart) {
        // Get the list name
        const listName = List.key

        // Register the list
        register.apply(this)

        // Attempt to create an item, if none already exist
        keystone.list(listName).model
          .find()
          .exec()
          .then(items => Promise.all(items.map(item => item.save())))
          .catch(reason =>
            console.error('WATCH ON START FAILED:\n', reason)
          )
      } else {
        // Register the list
        register.apply(this)
      }
    }
  }
}