'use strict';

var template = require('../../utils/template');

var Clients = Backbone.Marionette.Layout.extend({

  className: 'page-clients',
  template: template('pages/clients'),

  regions: {
    clients: '.clients-container',
    invoices: '.invoices-container',
    details: '.details-container'
  }

});

module.exports = Clients;
