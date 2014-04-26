'use strict';

var template = require('../../utils/template');

var RowHeading = Backbone.Marionette.ItemView.extend({

  className: 'row heading',
  template: template('editor/row_heading')

});

module.exports = RowHeading;
