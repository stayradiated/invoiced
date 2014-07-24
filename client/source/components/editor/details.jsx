'use strict';

var React = require('react');

var DetailsInput = require('./detailsInput');
var InvoiceModel = require('../../models/invoice');

var Details = React.createClass({

  propTypes: {
    model: React.PropTypes.instanceOf(InvoiceModel).isRequired
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='details'>

        <h3>Invoice</h3>

        <DetailsInput
          model={this.props.model}
          label='Invoice ID'
          key='number'
          type='text'
        />

        <DetailsInput
          model={this.props.model}
          label='Created At'
          key='date'
          type='date'
        />

        <h3>Customer</h3>

        <DetailsInput
          model={this.props.model}
          label='Customer Name'
          key='customer'
        />

        <DetailsInput
          model={this.props.model}
          label='Site'
          key='site'
        />

        <DetailsInput
          model={this.props.model}
          label='Email'
          key='email'
          type='email'
        />

        <h3>Cost</h3>

        <DetailsInput
          model={this.props.model}
          label='Airmover Hire'
          key='airmover'
          type='text'
        />

        <DetailsInput
          model={this.props.model}
          label='Labour'
          key='labour'
          type='text'
        />

        <DetailsInput
          model={this.props.model}
          label='Total Cost'
          key='cost'
          type='text'
        />

      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = Details;
