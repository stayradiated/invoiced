var _ = require('lodash');

var rest = function (res) {
  return _.partial(rest.end, res);
};

rest.catch = function (res) {
  return _.partial(rest.fail, res);
};

rest.end = function (res, data) {
  var json = data.toJSON({ shallow: true });
  res.header({'Content-Type': 'application/json'});
  res.end(JSON.stringify(json));
};

rest.fail = function (res, err) {
  var message = err && err.message ? err.message : err;
  res.status(500);
  res.end(message);
};

module.exports = rest;
