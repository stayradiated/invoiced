'use strict';

var React = require('react');

var RowSwitchBtn = React.createClass({

  getDefaultProps: function () {
    return {
      row: null,
      next: null
    };
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
    this.props.row.set('type', this.props.next);
  }

});

module.exports = RowSwitchBtn;
