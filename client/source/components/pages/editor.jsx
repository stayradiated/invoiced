'use strict';

var React = require('react');

var invoiceStore = require('../../stores/invoice').getCollection();
var rowStore = require('../../stores/row').getCollection();

var Header = require('../editor/Header');
var Details = require('../editor/Details');
var Rows = require('../editor/Rows');

var EditorPage = React.createClass({

  render: function () {
    var invoice = invoiceStore.first();

    window.INVOICE = invoice;

    return (
      /* jshint ignore: start */
      <div className='page-editor'>
        <Details invoice={invoice} />
        <div className='editor'>
          <Header invoice={invoice} />
          <Rows rows={invoice.get('rows')} />
        </div>
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = EditorPage;
