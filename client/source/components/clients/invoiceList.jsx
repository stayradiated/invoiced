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
    this.props.collection.on('add remove change:paid', this._onChange, this);
  },

  componentWillUnmount: function () {
    this.props.collection.off('add remove change:paid', this._onChange, this);
  },

  getInitialState: getState,

  propTypes: {
    collection: React.PropTypes.instanceOf(InvoiceCollection).isRequired
  },

  render: function () {

    var content = [];
    var paid = [];
    var unpaid = [];

    this.props.collection.forEach(function (invoice) {
      var item = (
        /* jshint ignore: start */
        <InvoiceItem key={invoice.cid} model={invoice} />
        /* jshint ignore: end */
      );
      if (invoice.get('paid')) {
        paid.unshift(item);
      } else {
        unpaid.unshift(item);
      }
    });

    if (unpaid.length) {
      content.push(
        /* jshint ignore: start */
        <section className='unpaid' key='unpaid'>
          <h5>Unpaid</h5>
          {unpaid}
        </section>
        /* jshint ignore: end */
      );
    }

    if (paid.length) {
      content.push(
        /* jshint ignore: start */
        <section className='paid' key='paid'>
          <h5>Paid</h5>
          {paid}
        </section>
        /* jshint ignore: end */
      );
    }

    return (
      /* jshint ignore: start */
      <div className='invoice-list'>{content}</div>
      /* jshint ignore: end */
    );
  },

  _onChange: function () {
    this.setState(getState());
  }

});

module.exports = InvoiceList;
