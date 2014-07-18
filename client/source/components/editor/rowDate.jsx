'use strict';

var React = require('react');

var ROW = require('../../constants/row');
var RowInput = require('./rowInput');
var RowDestroyBtn = require('./rowDestroyBtn');

var RowDate = React.createClass({

  getDefaultProps: function () {
    return {
      row: null
    };
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='row date'>
        <span>Job Date:</span>
        <RowInput row={this.props.row} type='date' />
        <div className='fill'></div>
        <RowDestroyBtn row={this.props.row} />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = RowDate;
