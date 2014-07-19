'use strict';

var React = require('react');

var ClientSection = require('../clients/clientSection');
var InvoiceSection = require('../clients/invoiceSection');
var InvoiceDetails = require('../clients/invoiceDetails');
var ClientStore = require('../../stores/client');
var InvoiceStore = require('../../stores/invoice');

var getState = function () {
  return {
    client: ClientStore.get('active'),
    invoice: InvoiceStore.get('active')
  };
};

var ClientsPage = React.createClass({

  getInitialState: getState,

  componentDidMount: function () {
    ClientStore.on('change:active', this._onChange, this);
    InvoiceStore.on('change:active', this._onChange, this);
  },

  componentWillUnmount: function () {
    ClientStore.off('change:active', this._onChange, this);
    InvoiceStore.off('change:active', this._onChange, this);
  },

  render: function () {
    /* jshint ignore: start */

    var sections = [
      <ClientSection key='client-section' />
    ];

    if (this.state.client) {
      sections.push(<InvoiceSection
        key={'invoice-section' + this.state.client.cid}
        model={this.state.client}
      />);
    }
    
    if (this.state.invoice) {
      sections.push(<InvoiceDetails
        key={'invoice-details' + this.state.invoice.cid}
        model={this.state.invoice}
      />);
    }

    return (
      <div className='page-clients'>{sections}</div>
    );
    /* jshint ignore: end */
  },

  _onChange: function () {
    this.setState(getState());
  }

});

module.exports = ClientsPage;
