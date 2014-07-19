'use strict';

var _ = require('lodash');
var React = require('react');

var App = require('../app');
var AppStore = require('../stores/app');
var AppActions = require('../actions/app');
var AppConstants = require('../constants/app');

var pages = {
  SETTINGS_PAGE: {
    name: 'Settings',
    icon: 'settings'
  },
  EDITOR_PAGE: {
    name: 'Editor',
    icon: 'pen'
  },
  CLIENT_PAGE: {
    name: 'Clients',
    icon: 'group'
  },
  INVOICES: {
    name: 'Invoices',
    icon: 'notes'
  }
};

var getState = function () {
  return {
    activePage: AppStore.get('activePage')
  };
};

var Header = React.createClass({

  componentDidMount: function () {
    AppStore.on('change:activePage', this._onChange, this);
  },

  componentWillUnmount: function () {
    AppStore.off('change:activePage', this._onChange, this);
  },

  getInitialState: getState,

  render: function () {
    return (
      /* jshint ignore: start */
      <header>
        <h1 className='logo'>
          Invoiced
          <span className='glyphicons shopping_cart' />
        </h1>
        <nav>{
          _.map(pages, function (page, id) {

            var classes = id;

            if (this.state.activePage === id) {
              classes += ' active';
            }

            return (
              <div
                key={id}
                className={classes}
                onClick={this.openPage.bind(this, id)}
              >
                <span className={'glyphicons ' + page.icon} />
                {page.name}
              </div>
            );
          }, this)
        }</nav>
      </header>
      /* jshint ignore: end */
    );
  },

  openPage: function (page) {
    AppActions.openPage(page);
  },

  _onChange: function () {
    this.setState(getState());
  }

});

module.exports = Header;
