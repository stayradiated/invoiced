'use strict';

var React = require('react');

var Header = require('../editor/header');
var Details = require('../editor/details');
var Rows = require('../editor/rows');
var InvoiceStore = require('../../stores/invoice');

var getState = function () {
  return {
    model: InvoiceStore.get('editing')
  };
};

var EditorPage = React.createClass({

  getInitialState: getState,

  componentDidMount: function () {
    InvoiceStore.on('change:editing', this._onChange, this);
  },

  componentWillUnmount: function () {
    InvoiceStore.off('change:editing', this._onChange, this);
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='page-editor'>
        <Details model={this.state.model} />
        <div className='editor'>
          <Header model={this.state.model} />
          <Rows collection={this.state.model.get('rows')} />
        </div>
      </div>
      /* jshint ignore: end */
    );
  },

  _onChange: function () {
    this.setState(getState());
  }

});

module.exports = EditorPage;
