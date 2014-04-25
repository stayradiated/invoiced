var query = require('../utils/db');
var rest = require('../utils/rest');

var rows = {

  all: function (req, res) {
    query('rows')
    .select()
    .then(rest(res))
    .catch(rest.catch(res));
  },

  get: function (req, res) {
    query('rows')
    .select()
    .where({ id: req.params.id })
    .then(rest(res))
    .catch(rest.catch(res));
  },

  listen: function (app) {
    app.get('/rows', rows.all);
    app.get('/rows/:id', rows.get);
  }

};

module.exports = rows;
