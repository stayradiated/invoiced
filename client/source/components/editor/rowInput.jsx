'use strict';

var React = require('react');

var RowInput = React.createClass({

  getDefaultProps: function () {
    return {
      row: null,
      type: 'text'
    };
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <input
        ref='input'
        type={this.props.type}
        onChange={this.handleChange}
        defaultValue={this.props.row.get('content')}
      />
      /* jshint ignore: end */
    );
  },

  handleChange: function () {
    var val = this.refs.input.getDOMNode().value;
    this.props.row.set('content', val);
  }

});

module.exports = RowInput;
