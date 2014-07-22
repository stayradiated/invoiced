'use strict';

var React = require('react');
var classSet = require('react/addons').addons.classSet;

var AppActions = require('../../actions/app');
var SnippetModel = require('../../models/snippet');

var SnippetItem = React.createClass({

  componentDidMount: function () {
    this.props.model.on('change', this._onChange, this);
  },

  componentWillUnmount: function () {
    this.props.model.off('change', this._onChange, this);
  },

  propTypes: {
    model: React.PropTypes.instanceOf(SnippetModel).isRequired
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='snippet-item'>
        <div className='shortcut'>{this.props.model.get('shortcut')}</div>
        <div className='content'>{this.props.model.get('content')}</div>
        <button type='button' onClick={this.destroy}>
          <span className='halflings remove '/>
        </button>
      </div>
      /* jshint ignore: end */
    );
  },

  edit: function () {
    AppActions.editSnippet(this.props.model);
  },

  destroy: function () {
    AppActions.destroySnippet(this.props.model);
  },

  _onChange: function () {
    this.forceUpdate();
  }

});

module.exports = SnippetItem;
