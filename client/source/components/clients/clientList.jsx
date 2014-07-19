'use strict';

var _ = require('lodash');
var React = require('react');

var ClientItem = require('./clientItem');
var ClientStore = require('../../stores/client');
var AppActions = require('../../actions/app');
var ClientCollection = require('../../models/clients');

var getState = function () {
  return {
    active: ClientStore.get('active')
  };
};

var ClientList = React.createClass({

  componentDidMount: function () {
    ClientStore.on('change:active', this._onChange, this);
    this.props.collection.on('add remove', this._onChange, this);
    this.props.collection.on('add', this.openClient, this);
  },

  componentWillUnmount: function () {
    ClientStore.off('change:active', this._onChange, this);
    this.props.collection.off('add remove', this._onChange, this);
    this.props.collection.off('add', this.openClient, this);
  },

  propTypes: {
    collection: React.PropTypes.instanceOf(ClientCollection).isRequired
  },

  getInitialState: getState,

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='client-list'>{
        this.props.collection.map(function (client) {
          return <ClientItem key={client.cid} model={client} />
        }, this)
      }</div>
      /* jshint ignore: end */
    );
  },

  openClient: function (client) {
    AppActions.openClient(client);
  },

  _onChange: function () {
    this.setState(getState());
  }

});

module.exports = ClientList;
