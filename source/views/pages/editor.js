'use strict';

var template = require('../../utils/template');

var Editor = Backbone.Marionette.Layout.extend({

  className: 'page-editor',
  template: template('pages/editor'),

  regions: {
    header: '.header-container',
    details: '.details-container',
    rows: '.rows-container',
  }

});

module.exports = Editor;
