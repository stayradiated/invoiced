'use strict';

var Row = require('./row');

var Rows = Backbone.Collection.extend({

  url: function () {
    return 'invoices/' + this.invoice.id + '/rows';
  },

  model: Row,

  initialize: function (options) {
    this.invoice = options.invoice;
  }

});

module.exports = Rows;
