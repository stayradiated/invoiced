var template = require('../../utils/template');

var Client = Backbone.Marionette.ItemView.extend({

  className: 'client',
  template: template('clients/client')

});

module.exports = Client;
