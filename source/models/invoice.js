'use strict';

var Row = require('./row');
var Rows = require('./rows');

var Invoice = Backbone.Model.extend({

  urlRoot: 'invoices',

  defaults: {
    id: null,
    clientId: null,

    customer: '',
    site: '',
    email: '',

    cost: 0,
    labour: 0,
    airmover: 0,
    paid: 0,

    dateCreated: '',
    dateUpdated: ''
  },

  initialize: function () {
    var date = this.get('date');
    if (! (date instanceof Date)) {
      this.set('date', new Date(date));
    }
  },

  customerName: function() {
    var match = this.customer.match(/^[a-z]\.\s/i);
    var initial = match ? match[0].slice(0) : '';
    return [initial, this.customer.slice(initial.length)];
  },

  invoiceDate: function() {
    return moment(this.date).format('DD MMMM YYYY');
  },

  invoiceDueDate: function() {
    var date = moment(this.date);
    date.add({ days: 7 });
    return date.format('DD MMMM YYYY');
  }

});

module.exports = Invoice;
