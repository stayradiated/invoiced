'use strict';

require('date-utils');

var Row = Backbone.RelationalModel.extend({

  defaults: { 
    id: null,
    name: '',
    number: 0,
    type: 'number'
  },

  toJSON: function () {
    var obj;
    obj = {
      name: this.name,
      number: this.number,
      type: this.type
    };
    switch (this.type) {
      case 'heading':
        obj.name = this.name.toUpperCase();
        break;
      case 'section':
        obj.name = new Date(obj.name).toFormat('DD/MM/YYYY');
    }
    return obj;
  }

});

module.exports = Row;
