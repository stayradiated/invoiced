'use strict';

var RowDateView = require('./row_date');
var RowBulletView = require('./row_bullet');
var RowNumberView = require('./row_item');
var RowHeadingView = require('./row_heading');

var Rows = Backbone.Marionette.CollectionView.extend({

  className: 'rows',

  getItemView: function (row) {
    console.log(row.toJSON());
    switch (row.get('type')) {
      case row.DATE:     return RowDateView;
      case row.HEADING:  return RowHeadingView;
      case row.ITEM:     return RowNumberView;
      case row.BULLET:   return RowBulletView;
    }
  },

  initialize: function () {
    this.listenTo(this.collection, 'change:type', this.render);
  }

});

module.exports = Rows;
