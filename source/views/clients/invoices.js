'use strict';

var template = require('../../utils/template');
var Invoice = require('./invoice');

var InvoicesList = Marionette.CollectionView.extend({
  className: 'invoice-collection',
  itemView: Invoice
});

var Invoices = Marionette.BossView.extend({

  className: 'invoices',
  template: template('clients/invoices'),

  subViews: {
    list: InvoicesList
  },

  subViewEvents: {
    'list itemview:select': 'selectInvoice'
  },

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

  onRender: function () {
    var first = this.list.children.first();
    if (first) first.select();
  },

  showEditor: function () {
    this.$el.addClass('edit');
    this.ui.name.focus();
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
    }, { patch: true });
  },

  createInvoice: function () {
    this.trigger('create:invoice', this.model);
  },

  selectInvoice: function (view) {
    this.$el.find('.active').removeClass('active');
    var invoice = view.model;
    this.trigger('select:invoice', invoice);
  }

});

module.exports = Invoices;
