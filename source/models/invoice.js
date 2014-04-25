'use strict';

var Row = require('./row');
var Rows = require('./rows');

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
    created: null,
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
