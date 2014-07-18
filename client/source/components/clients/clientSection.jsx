'use strict';

var _ = require('lodash');
var React = require('react');

var ClientList = require('./clientList');

var ClientSection = React.createClass({

  getDefaultProps: function () {
    return {
      clients: null,
      active: false,
      onCreate: _.noop,
      onSelect: _.noop
    };
  },

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
              type='button' onClick={this.props.onCreate}>
              <span className='halflings plus-sign' />
              New Client
            </button>
          </div>
        </header>
        <ClientList
          clients={this.props.clients}
          active={this.props.active} 
          onSelect={this.props.onSelect}
        />
      </section>
      /* jshint ignore: end */
    );
  }

});

module.exports = ClientSection;
