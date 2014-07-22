'use strict';

var React = require('react');
var classSet = require('react/addons').addons.classSet;

var Input = require('../utils/input');
var AppActions = require('../../actions/app');
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
          <Input
            model={this.props.model}
            key='shortcut'
          />
        </div>
        <div className='content'>
          <Input
            model={this.props.model}
            key='content'
          />
        </div>
        <button type='button' onClick={this.destroy}>
          <span className='halflings remove '/>
        </button>
      </div>
      /* jshint ignore: end */
    );
  },

  destroy: function () {
    AppActions.destroySnippet(this.props.model);
  }
 
});

module.exports = SnippetEditItem;
