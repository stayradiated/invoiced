'use strict';

var template = require('../../utils/template');
var HeaderView = require('../editor/header');
var DetailsView = require('../editor/details');
var RowsView = require('../editor/rows');
var RowsCollection = require('../../models/rows');

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

    var self = this;

    var rows = new RowsCollection({
      invoice: this.options.invoice
    });

    rows.fetch({ reset: true }).then(function () {
      self.rows.show(new RowsView({
        collection: rows
      }));

      self.header.show(new HeaderView({
        model: self.options.invoice,
        rows: rows
      }));
    });
  }

});

module.exports = Editor;
