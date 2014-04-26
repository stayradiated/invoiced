'use strict';

var template = require('../../utils/template');

var RowDate = Backbone.Marionette.ItemView.extend({

  className: 'row date',
  template: template('editor/row_date')

});

module.exports = RowDate;
