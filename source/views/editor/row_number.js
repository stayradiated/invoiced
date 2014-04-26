'use strict';

var template = require('../../utils/template');

var RowNumber = Backbone.Marionette.ItemView.extend({

  className: 'row number',
  template: template('editor/row_number')

});

module.exports = RowNumber;

