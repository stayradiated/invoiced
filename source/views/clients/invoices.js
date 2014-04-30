'use strict';

var template = require('../../utils/template');
var Invoice = require('./invoice');

var Invoices = Backbone.Marionette.CompositeView.extend({

  className: 'invoices',
  template: template('clients/invoices'),

  itemView: Invoice,
  itemViewContainer: '.invoice-collection',

  ui: {
    name: 'input.name',
    address: 'input.address',
    city: 'input.city',
    postcode: 'input.postcode'
  },

  events: {
    'click .create-invoice': 'createInvoice',
    'click .edit-client': 'showEditor',
    'click .editor .cancel': 'hideEditor',
    'click .editor .save': 'saveChanges'
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  showEditor: function () {
    this.$el.addClass('edit');
  },

  hideEditor: function () {
    this.$el.removeClass('edit');
  },

  saveChanges: function () {
    this.hideEditor();
    this.model.save({
      name: this.ui.name.val(),
      address: this.ui.address.val(),
      city: this.ui.city.val(),
      postcode: this.ui.postcode.val()
    }, {patch: true});
  },

  createInvoice: function () {
    var invoice = this.collection.create({
      clientId: this.model.id,
      date: new Date()
    });
    console.log(invoice);
  }

});

module.exports = Invoices;
