'use strict';

var React = require('react');

var SnippetStore = require('../../stores/snippet');
var SnippetItem = require('./snippetItem');
var SnippetEditItem = require('./snippetEditItem');
var SnippetCollection = require('../../models/snippets');

var getState = function () {
  return {
    edit: SnippetStore.get('edit')
  };
};

var SnippetList = React.createClass({

  getInitialState: getState,

  propTypes: {
    collection: React.PropTypes.instanceOf(SnippetCollection).isRequired
  },

  componentDidMount: function () {
    SnippetStore.on('change:edit', this._onChange, this);
    this.props.collection.on('add remove', this._onChange, this);
  },

  componentWillUnmount: function () {
    SnippetStore.off('change:edit', this._onChange, this);
    this.props.collection.off('add remove', this._onChange, this);
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='snippet-list'>{
        this.props.collection.map(function (snippet) {
          if (snippet === this.state.edit) {
            return <SnippetEditItem key={snippet.cid} model={snippet} />
          } else {
            return <SnippetItem key={snippet.cid} model={snippet} />
          }
        }, this)
      }</div>
      /* jshint ignore: end */
    );
  },

  _onChange: function () {
    this.setState(getState());
  }

});

module.exports = SnippetList;
