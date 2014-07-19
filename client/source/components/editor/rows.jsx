'use strict';

var React = require('react');

var RowDate = require('./rowDate');
var RowBullet = require('./rowBullet');
var RowNumber = require('./rowItem');
var RowHeading = require('./rowHeading');
var RowCollection = require('../../models/rows');

var ROW = require('../../constants/row');

var Rows = React.createClass({

  componentDidMount: function () {
    this.props.collection.on('add remove change:type', this._onChange, this);
  },

  componentWillUnmount: function () {
    this.props.collection.on('add remove change:type', this._onChange, this);
  },

  propTypes: {
    collection: React.PropTypes.instanceOf(RowCollection).isRequired
  },

  render: function () {
    var i = 1;

    var rows = this.props.collection.map(function (row) {
      var opts = {
        key: row.cid,
        model: row
      };

      switch (row.get('type')) {
        case ROW.DATE:
          return new RowDate(opts);
        case ROW.HEADING:
          return new RowHeading(opts);
        case ROW.BULLET:
          return new RowBullet(opts);
        case ROW.ITEM:
          opts.index = i++;
          return new RowNumber(opts);
      }

      // default row type
      return new RowNumber(opts);
    });

    return (
      /* jshint ignore: start */
      <div className='rows'>{rows}</div>
      /* jshint ignore: end */
    );
  },

  _onChange: function () {
    this.forceUpdate();
  }

});

module.exports = Rows;
