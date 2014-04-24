'use strict';

var Row = Backbone.RelationalModel.extend({

  defaults: { 
    name: '',
    order: 0,
    type: 'number'
  }

});

module.exports = Row;
