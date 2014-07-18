'use strict';

var _ = require('lodash');
var React = require('react');

var ClientCollection = require('../../models/clients');
var AppActions = require('../../actions/app');
var ClientList = require('./clientList');

var ClientSection = React.createClass({

  render: function () {
    return (
      /* jshint ignore: start */
      <section className='client'>
        <header>
          <div className='details'>
            <h2>Clients</h2>
          </div>
          <div className='buttons'>
            <button className='create-client'
              type='button' onClick={this.create}>
              <span className='halflings plus-sign' />
              New Client
            </button>
          </div>
        </header>
        <ClientList />
      </section>
      /* jshint ignore: end */
    );
  },

  create: function () {
    AppActions.createClient();
  }

});

module.exports = ClientSection;
