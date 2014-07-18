'use strict';

var React = require('react');

var ClientSection = require('../clients/clientSection');
var InvoiceSection = require('../clients/invoiceSection');
var InvoiceDetails = require('../clients/invoiceDetails');

var clientStore = require('../../stores/client').getCollection();
var invoiceStore = require('../../stores/invoice').getCollection();
var ClientModel = require('../../models/client');
var InvoiceModel = require('../../models/invoice');

var ClientsPage = React.createClass({

  componentDidMount: function () {
    clientStore.once('reset', this._onReset, this);
    invoiceStore.once('reset', this._onReset, this);
    clientStore.on('destroy', this._onDestroy, this);
  },

  componentWillUnmount: function () {
    clientStore.off('reset', this._onReset, this);
    invoiceStore.off('reset', this._onReset, this);
    clientStore.off('destroy', this._onDestroy, this);
  },

  getInitialState: function () {
    return {
      client: null,
      invoice: null
    };
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='page-clients'>
        <ClientSection
          clients={clientStore}
          active={this.state.client}
          onCreate={this.createClient}
          onSelect={this.selectClient}
        />
        {
          ! this.state.client ? '' :
            <InvoiceSection
              client={this.state.client}
              active={this.state.invoice}
              onCreate={this.createInvoice}
              onSelect={this.selectInvoice}
            />
        }
        {
          ! this.state.invoice ? '' :
            <InvoiceDetails
              invoice={this.state.invoice}
            />
        }
      </div>
      /* jshint ignore: end */
    );
  },

  selectClient: function (client) {
    this.setState({
      client: client,
      invoice: null
    });
  },

  selectInvoice: function (invoice) {
    this.setState({
      invoice: invoice
    });
  },

  /* TODO: Move into store */

  createClient: function () {
    var client = new ClientModel();
    client.once('sync', clientStore.add.bind(clientStore, client));
    this.selectClient(client);
  },

  createInvoice: function () {
    var invoice = new InvoiceModel({
      client: this.state.client,
      customer: this.state.client.get('name'),
      site: this.state.client.get('address')
    });
    invoice.once('sync', invoiceStore.add.bind(invoiceStore, invoice));
    this.selectInvoice(invoice);
  },

  _onReset: function () {
    this.forceUpdate();
  },

  _onDestroy: function () {
    this.selectClient(null);
  }

});

module.exports = ClientsPage;
