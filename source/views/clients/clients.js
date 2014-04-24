'use strict';

var template = require('../../utils/template');

var Clients = Backbone.Marionette.CompositeView.extend({

  className: 'clients',
  template: template('clients/clients')

});

module.exports = Clients;
