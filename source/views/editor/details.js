'use strict';

var template = require('../../utils/template');

var Details = Backbone.Marionette.ItemView.extend({

  className: 'details',
  template: template('editor/details'),

  events: {
    'change input': 'change'
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  change: function (e) {
    var input = $(e.target);
    var attr = input.attr('name');
    this.model.set(attr, input.val());
  }

});

module.exports = Details;
