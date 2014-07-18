'use strict';

var React = require('react');

var ROW = require('../../constants/row');
var RowInput = require('./rowInput');
var RowDestroyBtn = require('./rowDestroyBtn');
var RowSwitchBtn = require('./rowSwitchBtn');

var RowItem = React.createClass({

  getDefaultProps: function () {
    return {
      row: null
    };
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='row item'>
        <span className='bullet'>{this.props.row.get('order')}</span>
        <RowInput row={this.props.row} />
        <RowSwitchBtn row={this.props.row} next={ROW.BULLET} />
        <RowDestroyBtn row={this.props.row} />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = RowItem;
