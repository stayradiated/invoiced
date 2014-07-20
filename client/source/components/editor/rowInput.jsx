'use strict';

var React = require('react');

var RowModel = require('../../models/row');
var SnippetStore = require('../../stores/snippet');

var RowInput = React.createClass({

  componentDidMount: function () {
    this.props.model.on('change:content', this._onChange, this);
  },

  componentWillUnmount: function () {
    this.props.model.off('change:content', this._onChange, this);
  },

  propTypes: {
    model: React.PropTypes.instanceOf(RowModel).isRequired,
    type: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
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
        onKeyDown={this.handleKeyDown}
        value={this.props.model.get('content')}
      />
      /* jshint ignore: end */
    );
  },

  handleChange: function () {
    var val = this.refs.input.getDOMNode().value;
    this.props.model.set('content', val);
  },

  handleKeyDown: function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      var val = this.refs.input.getDOMNode().value;
      var snippet = SnippetStore.expand(val);
      if (snippet) {
        var content = snippet.get('content');
        this.props.model.set('content', snippet.get('content'));
      }
    }
  },

  _onChange: function () {
    this.forceUpdate();
  }

});

module.exports = RowInput;
