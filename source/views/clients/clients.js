'use strict';

var template = require('../../utils/template');
var Client = require('./client');

var Clients = Backbone.Marionette.CompositeView.extend({

  className: 'clients',
  template: template('clients/clients'),

  itemView: Client,
  itemViewContainer: '.client-collection'

});

module.exports = Clients;
