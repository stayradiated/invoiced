'use strict';

var _ = require('lodash');
var React = require('react');

var InvoiceItem = require('./invoiceItem');
var InvoiceStore = require('../../stores/invoice');
var InvoiceCollection = require('../../models/invoices');

var getState = function () {
  return {
    active: InvoiceStore.get('active')
  };
};

var InvoiceList = React.createClass({

  componentDidMount: function () {
    this.props.collection.on('add remove', this._onChange, this);
  },

  componentWillUnmount: function () {
    this.props.collection.off('add remove', this._onChange, this);
  },

  getInitialState: getState,

  propTypes: {
    collection: React.PropTypes.instanceOf(InvoiceCollection).isRequired
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='invoice-list'>{
        this.props.collection.map(function (invoice) {
          return <InvoiceItem key={invoice.cid} model={invoice} />
        }, this)
      }</div>
      /* jshint ignore: end */
    );
  },

  _onChange: function () {
    this.setState(getState());
  }

});

module.exports = InvoiceList;
