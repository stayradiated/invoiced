'use strict';

var _ = require('lodash');
var React = require('react');

var AppActions = require('../../actions/app');
var ClientModel = require('../../models/client');

var ClientDetails = React.createClass({

  componentDidMount: function () {
    this.props.model.on('change', this._onChange, this);
  },

  componentWillUnmount: function () {
    this.props.model.off('change', this._onChange, this);
  },

  propTypes: {
    model: React.PropTypes.instanceOf(ClientModel).isRequired
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <header>
        <div className='details'>
          <h2>{
            this.props.model.get('name')
          }</h2>
          <p>
            <span>{
              this.props.model.get('address')
            }</span>
            <span>{
              this.props.model.get('city')
            }</span>
            <span>{
              this.props.model.get('postcode')
            }</span>
          </p>
        </div>
        <div className='buttons'>
          <button type='button' onClick={this.editClient}>
            <span className='halflings pencil'>Edit Client Details</span>
          </button>
          <button className='primary' type='button'
            onClick={this.createInvoice}>
            <span className='halflings plus-sign'>New Invoice</span>
          </button>
        </div>
      </header>
      /* jshint ignore: end */
    );
  },

  editClient: function () {
    AppActions.editClient(this.props.model);
  },

  createInvoice: function () {
    AppActions.createInvoice(this.props.model);
  },

  _onChange: function () {
    this.forceUpdate();
  }

});

module.exports = ClientDetails;
