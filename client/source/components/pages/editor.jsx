'use strict';

var React = require('react');

var appStore = require('../../stores/app');

var Header = require('../editor/header');
var Details = require('../editor/details');
var Rows = require('../editor/rows');

var getEditorState = function () {
  return {
    invoice: appStore.getActiveInvoice()
  };
};

var EditorPage = React.createClass({

  getInitialState: getEditorState,

  componentDidMount: function () {
    appStore.on('change:activeInvoice', this._onChange, this);
  },

  componentWillUnmount: function () {
    appStore.off('change:activeInvoice', this._onChange, this);
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='page-editor'>
        <Details invoice={this.state.invoice} />
        <div className='editor'>
          <Header invoice={this.state.invoice} />
          <Rows rows={this.state.invoice.get('rows')} />
        </div>
      </div>
      /* jshint ignore: end */
    );
  },

  _onChange: function () {
    this.setState(getEditorState());
  }

});

module.exports = EditorPage;
