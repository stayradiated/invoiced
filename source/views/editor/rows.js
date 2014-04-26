'use strict';

var RowDateView = require('./row_date');
var RowBulletView = require('./row_bullet');
var RowNumberView = require('./row_number');
var RowHeadingView = require('./row_heading');

var Rows = Backbone.Marionette.CollectionView.extend({

  className: 'rows',

  getItemView: function () {
    return;
  }

});

module.exports = Rows;
