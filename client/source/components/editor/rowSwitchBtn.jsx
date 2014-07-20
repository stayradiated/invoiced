'use strict';

var React = require('react');

var RowModel = require('../../models/row');

var RowSwitchBtn = React.createClass({

  propTypes: {
    model: React.PropTypes.instanceOf(RowModel).isRequired,
    next: React.PropTypes.number
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <button type='button' tabIndex='-1' onClick={this.switchType}>
        <span className='halflings refresh' />
      </button>
      /* jshint ignore: end */
    );
  },

  switchType: function () {
    this.props.model.set('type', this.props.next);
  }

});

module.exports = RowSwitchBtn;
