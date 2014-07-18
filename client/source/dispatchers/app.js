var _ = require('lodash');
var Dispatcher = require('./dispatcher');

var AppDispatcher = _.extend(Dispatcher, {

  handleViewAction: function (action) {
    return this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }

});

module.exports = AppDispatcher;
