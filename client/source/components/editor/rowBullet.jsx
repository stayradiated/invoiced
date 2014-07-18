'use strict';

var React = require('react');

var ROW = require('../../constants/row');
var RowInput = require('./rowInput');
var RowDestroyBtn = require('./rowDestroyBtn');
var RowSwitchBtn = require('./rowSwitchBtn');

var RowBullet = React.createClass({

  getDefaultProps: function () {
    return {
      row: null
    };
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='row bullet'>
        <span className='bullet'>•</span>
        <RowInput row={this.props.row} />
        <RowSwitchBtn row={this.props.row} next={ROW.HEADING} />
        <RowDestroyBtn row={this.props.row} />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = RowBullet;
