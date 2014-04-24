'use strict';

var template = require('../utils/template');

var HeaderView = Marionette.ItemView.extend({

  className: 'header',
  template: template('header')

});

module.exports = HeaderView;
