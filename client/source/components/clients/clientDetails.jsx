'use strict';

var _ = require('lodash');
var React = require('react');

var ClientDetails = React.createClass({

  componentDidMount: function () {
    this.props.client.on('change', this._onChange, this);
  },

  componentWillUnmount: function () {
    this.props.client.off('change', this._onChange, this);
  },

  getDefaultProps: function () {
    return {
      client: null,
      onCreate: _.noop,
      onEdit: _.noop
    };
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
          <button className='edit-client' type='button' onClick={this.props.onEdit}>
            <span className='halflings pencil' />
            Edit Client Details
          </button>
          <button className='create-invoice primary' type='button' onClick={this.props.onCreate}>
            <span className='halflings plus-sign' />
            New Invoice
          </button>
        </div>
      </header>
      /* jshint ignore: end */
    );
  },

  _onChange: function () {
    this.forceUpdate();
  }

});

module.exports = ClientDetails;
