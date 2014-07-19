'use strict';

var _ = require('lodash');
var React = require('react');

var ClientDetails = require('./clientDetails');
var InvoiceList = require('./invoiceList');
var ClientEditor = require('./clientEditor');
var ClientModel = require('../../models/client');

var InvoiceSection = React.createClass({

  propTypes: {
    model: React.PropTypes.instanceOf(ClientModel)
  },

  render: function () {
    if (! this.props.model) return null;

    return (
      /* jshint ignore: start */
      <section className='invoice'>
        <ClientDetails
          model={this.props.model}
        />
        <ClientEditor
          model={this.props.model}
        />
        <InvoiceList
          collection={this.props.model.get('invoices')}
        />
      </section>
      /* jshint ignore: end */
    );
  }

});

module.exports = InvoiceSection;
