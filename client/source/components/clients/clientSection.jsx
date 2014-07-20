'use strict';

var _ = require('lodash');
var React = require('react');

var ClientList = require('./clientList');
var AppActions = require('../../actions/app');
var ClientStore = require('../../stores/client');

var ClientSection = React.createClass({

  render: function () {
    return (
      /* jshint ignore: start */
      <section className='client'>
        <header>
          <h2>Clients</h2>
          <div className='buttons'>
            <button type='button' onClick={this.create}>
              <span className='halflings plus-sign'>New Client</span>
            </button>
          </div>
        </header>
        <ClientList collection={ClientStore.get('collection')} />
      </section>
      /* jshint ignore: end */
    );
  },

  create: function () {
    AppActions.createClient();
  }

});

module.exports = ClientSection;
