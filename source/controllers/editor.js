'use strict';

var EditorPage = require('../views/pages/editor');
var Invoice = require('../models/invoice');

var EditorController = function () {
};

_.extend(EditorController.prototype, {

  view: function (invoice) {
    return new EditorPage({
      invoice: invoice
    });
  },

  open: function (id) {
    var invoice = new Invoice({ id: id });
    invoice.fetch();
    return invoice;
  }

});

module.exports = EditorController;
