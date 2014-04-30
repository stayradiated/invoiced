'use strict';

var template = require('../../utils/template');
var Client = require('./client');

var ClientsList = Marionette.CollectionView.extend({
  className: 'client-collection',
  itemView: Client,
});

module.exports = Clients;
var Clients = Marionette.BossView.extend({

  className: 'clients',
  template: template('clients/clients'),

  subViews: {
    list: ClientsList
  },

  subViewEvents: {
    'list itemview:select': 'selectClient'
  },

  events: {
    'click .create-client': 'createClient',
  },

  createClient: function () {
  },

  selectClient: function (view) {
    this.$el.find('.active').removeClass('active');
    var client = view.model;
    this.trigger('select:client', client);
  }

});

module.exports = Clients;
