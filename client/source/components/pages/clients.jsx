'use strict';

var React = require('react');

var ClientSection = require('../clients/clientSection');
var InvoiceSection = require('../clients/invoiceSection');
var InvoiceDetails = require('../clients/invoiceDetails');

var ClientsPage = React.createClass({

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='page-clients'>
        <ClientSection />
        <InvoiceSection />
        <InvoiceDetails />
      </div>
      /* jshint ignore: end */
    );
  },

  createInvoice: function () {
    var invoice = new InvoiceModel({
      client: this.state.client,
      customer: this.state.client.get('name'),
      site: this.state.client.get('address')
    });
    invoice.once('sync', InvoiceStore.add.bind(InvoiceStore, invoice));
    this.selectInvoice(invoice);
  }

});

module.exports = ClientsPage;
