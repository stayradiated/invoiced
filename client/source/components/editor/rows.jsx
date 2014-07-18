'use strict';

var React = require('react');

var RowDate = require('./rowDate');
var RowBullet = require('./rowBullet');
var RowNumber = require('./rowItem');
var RowHeading = require('./rowHeading');

var ROW = require('../../constants/row');

var Rows = React.createClass({

  componentDidMount: function () {
    this.props.rows.on('add remove change:type', this._onChange, this);
  },

  componentWillUnmount: function () {
    this.props.rows.on('add remove change:type', this._onChange, this);
  },

  getDefaultProps: function () {
    return {
      rows: null
    };
  },

  render: function () {
    var rows = this.props.rows.map(function (row) {
      var opts = {
        key: row.cid,
        row: row
      };

      switch (row.get('type')) {
        case ROW.DATE:     return new RowDate(opts);
        case ROW.HEADING:  return new RowHeading(opts);
        case ROW.ITEM:     return new RowNumber(opts);
        case ROW.BULLET:   return new RowBullet(opts);
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
