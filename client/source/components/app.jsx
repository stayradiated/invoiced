'use strict';

var React = require('react');

var Header = require('./header');
var ClientsPage = require('./pages/clients');
var EditorPage = require('./pages/editor');
var AppStore = require('../stores/app');
var AppConstants = require('../constants/app');

var getAppState = function () {
  return {
    activePage: AppStore.getActivePage()
  };
};

var App = React.createClass({

  componentDidMount: function () {
    AppStore.on('change', this._onChange, this);
  },

  componentWillUnmount: function () {
    AppStore.off('change', this._onChange, this);
  },

  getInitialState: function () {
    return getAppState();
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
    }

    return (
      /* jshint ignore: start */
      <div className='app'>
        <Header />
        <div className='page-container'>
          {page}
        </div>
      </div>
      /* jshint ignore: end */
    );
  },

  _onChange: function () {
    this.setState(getAppState());
  }

});

module.exports = App;
