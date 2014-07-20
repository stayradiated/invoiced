'use strict';

var React = require('react');

var ROW = require('../../constants/row');
var RowInput = require('./rowInput');
var RowDestroyBtn = require('./rowDestroyBtn');
var RowSwitchBtn = require('./rowSwitchBtn');
var RowModel = require('../../models/row');

var RowHeading = React.createClass({

  propTypes: {
    model: React.PropTypes.instanceOf(RowModel).isRequired
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='row heading'>
        <RowInput model={this.props.model} />
        <RowSwitchBtn model={this.props.model} next={ROW.ITEM} />
        <RowDestroyBtn model={this.props.model} />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = RowHeading;
