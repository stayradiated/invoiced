var query = require('../utils/db');
var rest = require('../utils/rest');

var invoices = {

  all: function (req, res) {
    query('invoices')
    .select()
    .then(rest(res))
    .catch(rest.catch(res));
  },

  get: function (req, res) {
    query('invoices')
    .select()
    .where({ id: req.params.id })
    .then(rest(res))
    .catch(rest.catch(res));
  },

  getRows: function (req, res) {
    query('rows')
    .select()
    .where({ invoiceId: req.params.id })
    .then(rest(res))
    .catch(rest.catch(res));
  },

  listen: function (app) {
    app.get('/invoices', invoices.all);
    app.get('/invoices/:id', invoices.get);
    app.get('/invoices/:id/rows', invoices.getRows);
  }

};

module.exports = invoices;
