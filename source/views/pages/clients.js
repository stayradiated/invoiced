'use strict';

var template = require('../../utils/template');

var Clients = Backbone.Marionette.ItemView.extend({

  className: 'page-clients',
  template: template('pages/clients')

});

module.exports = Clients;
