'use strict';

var React = require('react');

var SnippetManager = require('../settings/snippetManager');

var SettingsPage = React.createClass({

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='page-settings'>
        <SnippetManager />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = SettingsPage;
