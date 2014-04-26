'use strict';

var template = require('../../utils/template');

var Details = Backbone.Marionette.ItemView.extend({

  className: 'details',
  template: template('editor/details'),

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  }

});

module.exports = Details;
