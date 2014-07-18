'use strict';

var React = require('react');

var RowDestroyBtn = React.createClass({

  getDefaultProps: function () {
    return {
      row: null
    };
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <button type='button' tabIndex='-1' className='primary' onClick={this.destroy}>
        <span className='halflings remove' />
      </button>
      /* jshint ignore: end */
    );
  },

  destroy: function () {
    this.props.row.destroy();
  }

});

module.exports = RowDestroyBtn;
