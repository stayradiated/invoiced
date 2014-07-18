'use strict';

var _ = require('lodash');
var React = require('react');

var ClientItem = require('./clientItem');

var ClientList = React.createClass({

  componentDidMount: function () {
    this.props.clients.on('add remove', this._onChange, this);
  },

  componentWillUnmount: function () {
    this.props.clients.off('add remove', this._onChange, this);
  },

  getDefaultProps: function () {
    return {
      clients: null,
      active: false,
      onSelect: _.noop
    };
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='client-list'>
        {
          this.props.clients.map(function (client) {
            return <ClientItem
              key={client.cid}
              client={client}
              active={client === this.props.active}
              onClick={this.props.onSelect.bind(null, client)}
            />
          }, this)
        }
      </div>
      /* jshint ignore: end */
    );
  },

  _onChange: function () {
    this.forceUpdate();
  }

});

module.exports = ClientList;
