'use strict';

var Row = Backbone.Model.extend({

  defaults: { 
    name: '',
    order: 0,
    type: 'number'
  }

});

module.exports = Row;
