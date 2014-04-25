'use strict';

var template = require('../../utils/template');
var DetailsView = require('../editor/details');

var Editor = Backbone.Marionette.Layout.extend({

  className: 'page-editor',
  template: template('pages/editor'),

  regions: {
    header: '.header-container',
    details: '.details-container',
    rows: '.rows-container',
  },

  onRender: function () {
    this.details.show(new DetailsView({
      model: this.options.invoice
    }));
  }

});

module.exports = Editor;
