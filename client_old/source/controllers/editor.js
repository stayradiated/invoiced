'use strict';

var EditorPage = require('../views/pages/editor');
var Invoice = require('../models/invoice');

// Views
var HeaderView = require('../views/editor/header');
var DetailsView = require('../views/editor/details');
var RowsView = require('../views/editor/rows');

var EditorController = function () {
};

_.extend(EditorController.prototype, {

  render: function () {
    console.log('rendering editor');
    this.view = new EditorPage();
    this.view.on('render', this.showInvoice, this);
    return this.view;
  },

  open: function (invoice) {
    console.log('Editor: opening invoice', invoice);
    this.invoice = invoice;
    this.showInvoice();
  },

  create: function (client) {
    console.log('Editor: creating invoice for client', client);
    var invoice = new Invoice({
      client: client,
      customer: client.get('name'),
      site: client.get('address')
    });
    return this.open(invoice);
  },

  showInvoice: function () {
    if (! this.invoice) {
      console.log('Editor: Not sure what to do?');
      return;
    }

    var detailsView = new DetailsView({ model: this.invoice });
    var headerView = new HeaderView();
    var rowsView = new RowsView({ collection: this.invoice.get('rows') });

    headerView.on('save', this.save, this);
    headerView.on('create:row', this.createRow, this);

    this.view.header.show(headerView);
    this.view.details.show(detailsView);
    this.view.rows.show(rowsView);
  },

  save: function () {
    this.invoice.save(undefined, { patch: true });
    this.invoice.get('rows').save();
  },

  createRow: function (type) {
    this.invoice.get('rows').create({
      type: type
    });
  }

});

module.exports = EditorController;
