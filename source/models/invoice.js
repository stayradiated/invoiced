'use strict';

require('date-utils');
var Row = require('./row');
var Rows = require('./rows');

var digits = function(number) {
  var sections;
  number = (Math.round(number * 100) / 100).toString();
  sections = number.split('.');
  if (sections.length === 1) {
    return number + '.00';
  }
  if (sections[1].length === 1) {
    return number + '0';
  }
  if (sections[1].length === 2) {
    return number;
  }
  if (sections[1].length > 2) {
    return sections[0] + '.' + sections[1].slice(0, 2);
  }
};

var Invoice = Backbone.RelationalModel.extend({

  relations: [{
    type: Backbone.HasMany,
    key: 'rows',
    relatedModel: Row,
    collectionType: Rows,
    reverseRelation: {
      key: 'invoice',
    }
  }],

  defaults: {
    id: 7300,
    clientId: -1,
    date: new Date().toYMD(),
    customer: '',
    email: '',
    site: '',
    cost: 0,
    labour: 0,
    airmover: 0,
    paid: 0
  },

  customerName: function() {
    var match = this.customer.match(/^[a-z]\.\s/i);
    if (! match) match = [''];
    return [match[0].slice(0), this.customer.slice(match[0].length)];
  },

  invoiceDate: function() {
    var date;
    date = new Date(this.date);
    return date.toFormat('DD MMMM YYYY');
  },

  invoiceDueDate: function() {
    var date = new Date(this.date);
    date.add({ days: 7 });
    return date.toFormat('DD MMMM YYYY');
  },

  toJSON: function () {
    return {
      initial: this.customerName()[0].toUpperCase(),
      invoiceId: this.id,
      invoiceDate: this.invoiceDate(),
      invoiceDue: this.invoiceDueDate().toUpperCase(),
      jobCustomer: this.customerName()[1].toUpperCase(),
      jobSite: this.site.toUpperCase(),
      jobAmount: digits(this.cost),
      jobGst: digits(this.cost / 1.15 * 0.15),
      jobBeforeGst: digits(this.cost / 1.15),
      labour: digits(this.labour),
      airmover: digits(this.airmover),
      email: this.email
    };
  }

});

module.exports = Invoice;
