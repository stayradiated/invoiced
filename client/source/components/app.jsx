'use strict';

var React = require('react');

var Header = require('./header');
var Modal = require('./modal');
var ClientsPage = require('./pages/clients');
var EditorPage = require('./pages/editor');
var SettingsPage = require('./pages/settings');
var AppStore = require('../stores/app');
var AppConstants = require('../constants/app');
var ClientStore = require('../stores/client');
var InvoiceStore = require('../stores/invoice');

var getState = function () {
  return {
    activePage: AppStore.get('activePage')
  };
};

var App = React.createClass({

  componentDidMount: function () {
    AppStore.on('change:activePage', this._onChange, this);
    ClientStore.get('collection').once('reset', this._onChange, this);
    InvoiceStore.get('collection').once('reset', this._onChange, this);
  },

  getInitialState: function () {
    return getState();
  },

  render: function () {
    var page;

    switch (this.state.activePage) {
      case AppConstants.CLIENT_PAGE:
        page = new ClientsPage();
        break;
      case AppConstants.EDITOR_PAGE:
        page = new EditorPage();
        break;
      case AppConstants.SETTINGS_PAGE:
        page = new SettingsPage();
        break;
    }

    return (
      /* jshint ignore: start */
      <div className='app'>
        <Header />
        <Modal />
        <div className='page-container'>
          {page}
        </div>
      </div>
      /* jshint ignore: end */
    );
  },

  _onChange: function () {
    this.setState(getState());
  }

});

module.exports = App;
