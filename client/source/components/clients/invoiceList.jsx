'use strict';

var _ = require('lodash');
var React = require('react');

var InvoiceItem = require('./invoiceItem');

var InvoiceList = React.createClass({

  componentDidMount: function () {
    this.props.invoices.on('add remove', this._onChange, this);
  },

  componentWillUnmount: function () {
    this.props.invoices.off('add remove', this._onChange, this);
  },

  getDefaultProps: function () {
    return {
      invoices: null,
      active: false,
      onSelect: _.noop
    };
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
              active={invoice === this.props.active}
              onClick={this.props.onSelect.bind(null, invoice)}
            />
          }, this)
        }
      </div>
      /* jshint ignore: end */
    );
  },

  _onChange: function () {
    this.forceUpdate();
  }

});

module.exports = InvoiceList;
