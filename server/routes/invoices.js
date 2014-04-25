var query = require('../utils/db');
var rest = require('../utils/rest');

var invoices = {

  get: function (req, res) {
    query('invoices')
    .select()
    .then(rest(res))
    .catch(rest.catch(res));
  },

  listen: function (app) {
    app.get('/invoices', invoices.get);
  }

};

module.exports = invoices;
