'use strict';

var RowDateView = require('./row_date');
var RowBulletView = require('./row_bullet');
var RowNumberView = require('./row_item');
var RowHeadingView = require('./row_heading');

var Rows = Backbone.Marionette.CollectionView.extend({

  className: 'rows',

  getItemView: function (row) {
    switch (row.get('type')) {
      case 'section': return RowDateView;
      case 'heading': return RowHeadingView;
      case 'number':  return RowNumberView;
      case 'bullet':  return RowBulletView;
    }
  }

});

module.exports = Rows;
