'use strict';

var _ = require('lodash');
var React = require('react');

var ClientDetails = require('./clientDetails');
var InvoiceList = require('./invoiceList');
var ClientEditor = require('./clientEditor');
var AppStore = require('../../stores/app');
var ClientStore = require('../../stores/client');

var InvoiceSection = React.createClass({

  componentDidMount: function () {
    AppStore.on('change:activeClient', this._handleNewClient, this);
    this._bindEvents(this.state.client);
  },

  componentWillUnmount: function () {
    AppStore.off('change:activeClient', this._handleNewClient, this);
    this._unbindEvents(this.state.client);
  },

  getInitialState: function () {
    return {
      client: AppStore.getActiveClient(),
      editMode: false
    };
  },

  render: function () {
    if (! this.state.client) return null;

    return (
      /* jshint ignore: start */
      <section className='invoice'>
        <ClientDetails
          client={this.state.client}
          onEdit={this.showEditor}
        />
        {
          ! (this.state.editMode || this.state.client.isNew()) ? '' :
            <ClientEditor
              client={this.props.client}
              onFinish={this.hideEditor}
            />
        }
        <InvoiceList invoices={this.state.client.get('invoices')} />
      </section>
      /* jshint ignore: end */
    );
  },

  showEditor: function () {
    this.setState({
      editMode: true
    });
  },

  hideEditor: function () {
    this.setState({
      editMode: false
    });
  },

  _handleNewClient: function () {
    var newClient = AppStore.getActiveClient();
    this._unbindEvents(this.state.client);
    this._bindEvents(newClient);
    this.setState({
      client: newClient,
      editMode: false
    });
  },

  _bindEvents: function (client) {
    if (! client) return;
    client.once('sync', this._onSync, this);
    client.get('invoices').on('add remove', this._onChange, this);
  },

  _unbindEvents: function (client) {
    if (! client) return;
    client.once('sync', this._onSync, this);
    client.off('sync', this._onSync, this);
    client.get('invoices').off('add remove', this._onChange, this);
  },

  _onSync: function () {
    this.forceUpdate();
  },

  _onChange: function () {
    this.forceUpdate();
  }

});

module.exports = InvoiceSection;
