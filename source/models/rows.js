'use strict';

var Row = require('./row');
var config = require('../config');

var Rows = Backbone.Collection.extend({

  model: Row,

  url: function () {
    return config.root + '/invoices/' + this.invoice.id + '/rows';
  },

  initialize: function (options) {
    this.invoice = options.invoice;
  }

});

module.exports = Rows;
