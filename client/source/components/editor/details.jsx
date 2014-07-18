'use strict';

var React = require('react');

var DetailsInput = require('./detailsInput');

var Details = React.createClass({

  getDefaultProps: function () {
    return {
      invoice: null
    };
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='details'>

        <h3>Invoice</h3>

        <DetailsInput
          invoice={this.props.invoice}
          label='Invoice ID'
          key='number'
          type='number'
        />

        <DetailsInput
          invoice={this.props.invoice}
          label='Created At'
          key='date'
          type='date'
        />

        <h3>Customer</h3>

        <DetailsInput
          invoice={this.props.invoice}
          label='Customer Name'
          key='customer'
        />

        <DetailsInput
          invoice={this.props.invoice}
          label='Site'
          key='site'
        />

        <DetailsInput
          invoice={this.props.invoice}
          label='Email'
          key='email'
          type='email'
        />

        <h3>Cost</h3>

        <DetailsInput
          invoice={this.props.invoice}
          label='Airmover Hire'
          key='airmover'
          type='currency'
        />

        <DetailsInput
          invoice={this.props.invoice}
          label='Labour'
          key='labour'
          type='currency'
        />

        <DetailsInput
          invoice={this.props.invoice}
          label='Total Cost'
          key='cost'
          type='currency'
        />

      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = Details;
