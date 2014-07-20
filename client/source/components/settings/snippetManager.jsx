'use strict';

var React = require('react');

var AppActions = require('../../actions/app');
var SnippetStore = require('../../stores/snippet');
var SnippetList = require('./snippetList');

var SnippetManager = React.createClass({

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='snippet-manager'>
        <header>
          <h1>Snippets</h1>
          <button type='button' onClick={this.create}>
            <span className='halflings plus-sign'>New Snippet</span>
          </button>
        </header>
        <SnippetList collection={SnippetStore.get('collection')} />
      </div>
      /* jshint ignore: end */
    );
  },

  create: function () {
    console.log('creating snippet');
    AppActions.createSnippet();
  }

});

module.exports = SnippetManager;
