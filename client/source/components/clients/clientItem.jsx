'use strict';

var React = require('react');
var classSet = require('react/addons').addons.classSet;

var AppActions = require('../../actions/app');
var ClientModel = require('../../models/client');

var ClientItem = React.createClass({

  componentDidMount: function () {
    this.props.client.on('change', this._onChange, this);
    this.props.client.get('invoices').on('add remove', this._onChange, this);
  },

  componentWillUnmount: function () {
    this.props.client.off('change', this._onChange, this);
    this.props.client.get('invoices').off('add remove', this._onChange, this);
  },

  propTypes: {
    client: React.PropTypes.instanceOf(ClientModel)
  },

  render: function () {

    var classes = classSet({
      'client-item': true,
      'active': this.props.active
    });

    return (
      /* jshint ignore: start */
      <div className={classes} onClick={this.open} >
        <div className='details'>
          <h3>
            {this.props.client.get('name')}
          </h3>
          <p>
            <span className='address'>
              {this.props.client.get('address')}
            </span>
            <span className='city'>
              {this.props.client.get('city')}
            </span>
            <span className='postcode'>
              {this.props.client.get('postcode')}
            </span>
          </p>
        </div>
        <div className='invoices-count number'>
          {this.props.client.get('invoices').length}
        </div>
      </div>
      /* jshint ignore: end */
    );
  },

  open: function () {
    AppActions.openClient(this.props.client);
  },

  _onChange: function () {
    this.forceUpdate();
  }

});

module.exports = ClientItem;
