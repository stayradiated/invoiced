var query = require('../utils/db');
var rest = require('../utils/rest');

var clients = {

  all: function (req, res) {
    query('clients')
    .select('clients.*')
    .count('invoices.id as invoices')
    .join('invoices', 'clients.id', '=', 'invoices.clientId')
    .orderBy('clients.dateUpdated', 'desc')
    .groupBy('clients.id')
    .then(rest(res))
    .catch(rest.catch(res));
  },

  get: function (req, res) {
    query('clients')
    .select()
    .where({ id: req.params.id })
    .then(function (rows) {
      return rows[0];
    })
    .then(rest(res))
    .catch(rest.catch(res));
  },

  getInvoices: function (req, res) {
    query('invoices')
    .select()
    .where({ clientId: req.params.id })
    .orderBy('dateUpdated', 'desc')
    .then(rest(res))
    .catch(rest.catch(res));
  },

  listen: function (app) {
    app.get('/clients', clients.all);
    app.get('/clients/:id', clients.get);
    app.get('/clients/:id/invoices', clients.getInvoices);
  }

};

module.exports = clients;
