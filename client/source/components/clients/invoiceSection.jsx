'use strict';

var _ = require('lodash');
var React = require('react');

var ClientDetails = require('./clientDetails');
var InvoiceList = require('./invoiceList');
var ClientEditor = require('./clientEditor');

var InvoiceSection = React.createClass({

  componentDidMount: function () {
    this._bindEvents(this.props.client);
  },

  componentWillUnmount: function () {
    this._unbindEvents(this.props.client);
  },

  componentWillReceiveProps: function (newProps) {
    this._unbindEvents(this.props.client);
    this._bindEvents(newProps.client);
    this.hideEditor();
  },

  getDefaultProps: function () {
    return {
      client: null,
      active: false,
      onCreate: _.noop,
      onSelect: _.noop
    };
  },

  getInitialState: function () {
    return {
      editMode: false
    };
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <section className='invoice'>
        <ClientDetails
          client={this.props.client}
          onCreate={this.props.onCreate}
          onEdit={this.showEditor}
        />
        {
          ! (this.state.editMode || this.props.client.isNew()) ? '' :
            <ClientEditor
              client={this.props.client}
              onFinish={this.hideEditor}
            />
        }
        <InvoiceList
          invoices={this.props.client.get('invoices')}
          active={this.props.active}
          onSelect={this.props.onSelect}
        />
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

  _bindEvents: function (client) {
    client.once('sync', this._onSync, this);
    client.get('invoices').on('add remove', this._onChange, this);
  },

  _unbindEvents: function (client) {
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
