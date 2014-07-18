'use strict';

var React = require('react');

var ROW = require('../../constants/row');
var RowInput = require('./rowInput');
var RowDestroyBtn = require('./rowDestroyBtn');
var RowSwitchBtn = require('./rowSwitchBtn');

var RowHeading = React.createClass({

  getDefaultProps: function () {
    return {
      row: null
    };
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='row heading'>
        <RowInput row={this.props.row} />
        <RowSwitchBtn row={this.props.row} next={ROW.ITEM} />
        <RowDestroyBtn row={this.props.row} />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = RowHeading;
