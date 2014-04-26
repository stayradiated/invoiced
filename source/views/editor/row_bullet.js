'use strict';

var template = require('../../utils/template');

var RowBullet = Backbone.Marionette.ItemView.extend({

  className: 'row bullet',
  template: template('editor/row_bullet')

});

module.exports = RowBullet;
