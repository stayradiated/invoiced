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

  render: function (invoice) {
    this.invoice = invoice;
    this.view = new EditorPage({ invoice: this.invoice });
    this.view.on('render', this.showInvoice, this);
    return this.view;
  },

  create: function (client) {
    var invoice = new Invoice({
      client: client,
      customer: client.get('name'),
      site: client.get('address')
    });
    return this.render(invoice);
  },

  showInvoice: function () {
    var detailsView = new DetailsView({ model: this.invoice });
    var headerView = new HeaderView();
    var rowsView = new RowsView({ collection: this.invoice.get('rows') });

    headerView.on('save', this.save, this);

    this.view.header.show(headerView);
    this.view.details.show(detailsView);
    this.view.rows.show(rowsView);
  },

  save: function () {
    this.invoice.save(undefined, { patch: true });
    this.invoice.get('rows').each(function (row) {
      if (row.hasChanged()) row.save(undefined, { patch: true });
    });
  }

});

module.exports = EditorController;
