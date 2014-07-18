'use strict';

var _ = require('lodash');
var React = require('react');

var AppActions = require('../../actions/app');
var ClientModel = require('../../models/client');

var ClientDetails = React.createClass({

  componentDidMount: function () {
    this.props.client.on('change', this._onChange, this);
  },

  componentWillUnmount: function () {
    this.props.client.off('change', this._onChange, this);
  },

  propTypes: {
    client: React.PropTypes.instanceOf(ClientModel)
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <header>
        <div className='details'>
          <h2>{this.props.client.get('name')}</h2>
          <p>
            <span className='address'>{this.props.client.get('address')}</span>
            <span className='city'>{this.props.client.get('city')}</span>
            <span className='postcode'>{this.props.client.get('postcode')}</span>
          </p>
        </div>
        <div className='buttons'>
          <button className='edit-client' type='button' onClick={this.editClient}>
            <span className='halflings pencil' />
            Edit Client Details
          </button>
          <button className='create-invoice primary' type='button' onClick={this.createInvoice}>
            <span className='halflings plus-sign' />
            New Invoice
          </button>
        </div>
      </header>
      /* jshint ignore: end */
    );
  },

  editClient: function () {
    AppActions.editClient(this.props.client);
  },

  createInvoice: function () {
    AppActions.createInvoice(this.props.client);
  },

  _onChange: function () {
    this.forceUpdate();
  }

});

module.exports = ClientDetails;
