'use strict';

var React = require('react');
var classSet = require('react/addons').addons.classSet;

var SnippetModel = require('../../models/snippet');

var SnippetEditItem = React.createClass({

  propTypes: {
    model: React.PropTypes.instanceOf(SnippetModel).isRequired
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='snippet-item edit'>
        <div className='shortcut'>
          <input
            ref='shortcut'
            defaultValue={this.props.model.get('shortcut')}
          />
        </div>
        <div className='content'>
          <input
            ref='content'
            defaultValue={this.props.model.get('content')}
          />
        </div>
        <button type='button' onClick={this.save}>
          Save
        </button>
      </div>
      /* jshint ignore: end */
    );
  },

  save: function () {
    this.props.model.save({
      shortcut: this.refs.shortcut.getDOMNode().value,
      content: this.refs.content.getDOMNode().value
    });
  }

});

module.exports = SnippetEditItem;
