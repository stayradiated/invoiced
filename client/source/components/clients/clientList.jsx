'use strict';

var _ = require('lodash');
var React = require('react');

var ClientItem = require('./clientItem');
var ClientStore = require('../../stores/client').getCollection();
var AppStore = require('../../stores/app');
var AppActions = require('../../actions/app');

var ClientList = React.createClass({

  componentDidMount: function () {
    AppStore.on('change:activeClient', this._onChange, this);
    ClientStore.on('add remove', this._onChange, this);
    ClientStore.on('add', this.openClient, this);
  },

  componentWillUnmount: function () {
    AppStore.off('change:activeClient', this._onChange, this);
    ClientStore.off('add remove', this._onChange, this);
    ClientStore.off('add', this.openClient, this);
  },

  getInitialState: function () {
    return {
      active: AppStore.getActiveClient()
    };
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='client-list'>
        {
          ClientStore.map(function (client) {
            return <ClientItem
              key={client.cid}
              client={client}
              active={client === this.state.active}
            />
          }, this)
        }
      </div>
      /* jshint ignore: end */
    );
  },

  openClient: function (client) {
    AppActions.openClient(client);
  },

  _onChange: function () {
    console.log('updating client list');
    this.forceUpdate();
  }

});

module.exports = ClientList;
