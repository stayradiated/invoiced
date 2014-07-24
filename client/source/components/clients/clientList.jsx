'use strict';

var _ = require('lodash');
var React = require('react');

var ClientItem = require('./clientItem');
var ClientStore = require('../../stores/client');
var AppActions = require('../../actions/app');
var ClientCollection = require('../../models/clients');
var SearchBox = require('../utils/searchBox');

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

  getInitialState: function () {
    return {
      active: ClientStore.get('active'),
      filter: ''
    };
  },

  render: function () {

    var clients = this.props.collection.map(function (client) {
      if (client.matchFilter(this.state.filter)) {
        /* jshint ignore: start */
        return <ClientItem key={client.cid} model={client} />;
        /* jshint ignore: end */
      }
    }, this);

    clients = _.reject(clients, _.isUndefined);

    return (
      /* jshint ignore: start */
      <div className='client-list'>
        <SearchBox 
          collection={ClientStore.get('collection')}
          onChange={this.filterBy}
        />
        <div className='clients'>{clients}</div>
      </div>
      /* jshint ignore: end */
    );
  },

  filterBy: function (filter) {
    this.setState({
      filter: filter
    });
  },

  openClient: function (client) {
    AppActions.openClient(client);
  },

  _onChange: function () {
    this.setState({
      active: ClientStore.get('collection')
    });
  }

});

module.exports = ClientList;
