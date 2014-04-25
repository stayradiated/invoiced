'use strict';

var EditorPage = require('../views/pages/editor');

var EditorController = function () {
};

_.extend(EditorController.prototype, {

  view: function (invoice) {
    return new EditorPage({
      invoice: invoice
    });
  }

});

module.exports = EditorController;
