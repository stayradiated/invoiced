'use strict';

var App = require('../app');
var template = require('../utils/template');

var HeaderView = Marionette.ItemView.extend({

  className: 'header',
  template: template('header'),

  initialize: function () {
    this.listenTo(App, 'select:page', this.setActive);
  },

  setActive: function (page) {
    this.$('.active').removeClass('active');
    this.$('a.' + page).addClass('active');
  }

});

module.exports = HeaderView;
