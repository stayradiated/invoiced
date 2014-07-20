'use strict';

var React = require('react');

var ROW = require('../../constants/row');
var RowInput = require('./rowInput');
var RowDestroyBtn = require('./rowDestroyBtn');
var RowModel = require('../../models/row');

var RowDate = React.createClass({

  propTypes: {
    model: React.PropTypes.instanceOf(RowModel).isRequired
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='row date'>
        <span>Job Date:</span>
        <RowInput model={this.props.model} type='date' />
        <div className='fill'></div>
        <RowDestroyBtn model={this.props.model} />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = RowDate;
