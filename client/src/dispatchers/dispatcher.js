import Promise from 'bluebird'

const _callbacks = []
const _promises = []

const _addPromise = (callback, payload) => {
  _promises.push(new Promise((resolve, reject) => {
    if (callback(payload)) {
      resolve(payload)
    } else {
      reject(new Error('Dispatcher callback unsuccessful'))
    }
  }))
}

const _clearPromises = () => {
  _promises.length = 0
}

const Dispatcher = {
  /**
   * Register
   * - callback (function) : the callback to be registered
   * > number : the index of the callback
   */

  register (callback) {
    return _callbacks.push(callback) - 1
  },


  /**
   * Dispatch
   * - payload (object) : the data from the action
   */

  dispatch (payload) {
    _callbacks.forEach((callback) => {
      _addPromise(callback, payload)
    })
    return Promise.all(_promises).then(_clearPromises)
  }
}

export default Dispatcher
