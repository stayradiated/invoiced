var query = require('../utils/db');
var rest = require('../utils/rest');

var snippets = {

  all: function (req, res) {
    query('snippets')
    .select()
    .then(rest(res))
    .catch(rest.catch(res));
  },

  get: function (req, res) {
    query('snippets')
    .select()
    .where({ id: req.params.id })
    .then(rest(res))
    .catch(rest.catch(res));
  },

  listen: function (app) {
    app.get('/snippets', snippets.all);
    app.get('/snippets/:id', snippets.get);
  }

};

module.exports = snippets;
