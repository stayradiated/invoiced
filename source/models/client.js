'use strict';

var Client = Backbone.RelationalModel.extend({

  defaults: {
    id: null,
    name: '',
    address: '',
    city: '',
    postcode: ''
  },

  toJSON: function() {
    return {
      clientName: this.name.toUpperCase(),
      clientAddress: this.address.toUpperCase(),
      clientCity: this.city.toUpperCase(),
      clientPostcode: this.postcode
    };
  }

});

module.exports = Client;
