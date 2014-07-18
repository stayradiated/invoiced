'use strict';

var _ = require('lodash');
var React = require('react');

var InvoiceItem = require('./invoiceItem');
var AppStore = require('../../stores/app');
var InvoiceCollection = require('../../models/invoices');

var getState = function () {
  return {
    active: AppStore.getActiveInvoice
  };
};

var InvoiceList = React.createClass({

  componentDidMount: function () {
    this.props.invoices.on('add remove', this._onChange, this);
  },

  componentWillUnmount: function () {
    this.props.invoices.off('add remove', this._onChange, this);
  },

  getInitialState: getState,

  propTypes: {
    invoices: React.PropTypes.instanceOf(InvoiceCollection)
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='invoice-list'>
        {
          this.props.invoices.map(function (invoice) {
            return <InvoiceItem
              key={invoice.cid}
              invoice={invoice}
              active={invoice === this.state.active}
            />
          }, this)
        }
      </div>
      /* jshint ignore: end */
    );
  },

  _onChange: function () {
    this.setState(getState());
  }

});

module.exports = InvoiceList;
