'use strict';

var template = require('../../utils/template');

var Header = Backbone.Marionette.ItemView.extend({

  className: 'header',
  template: template('editor/header')

});

module.exports = Header;
