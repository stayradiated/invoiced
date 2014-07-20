'use strict';

var React = require('react');

var RowCollection = require('../../models/rows');

var InvoiceRows = React.createClass({

  propTypes: {
    collection: React.PropTypes.instanceOf(RowCollection).isRequired
  },

  render: function () {
    return (
      /* jshint ignore: start */
      null
      /* jshint ignore: end */
    );
  }

});

module.exports = InvoiceRows;
