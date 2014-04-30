'use strict';

var template = require('../../utils/template');

var Details = Backbone.Marionette.ItemView.extend({

  className: 'details',
  template: template('clients/details')

});

module.exports = Details;
