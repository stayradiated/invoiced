'use strict';

var template = require('../../utils/template');
var HeaderView = require('../editor/header');
var DetailsView = require('../editor/details');
var RowsView = require('../editor/rows');

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
    this.header.show(new HeaderView({
      model: this.options.invoice
    }));
    this.rows.show(new RowsView({
      collection: this.options.rows
    }));
  }

});

module.exports = Editor;
