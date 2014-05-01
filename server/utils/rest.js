var rest = function (res) {
  return function (rows) {
    res.header({'Content-Type': 'application/json'});
    res.end(JSON.stringify(rows));
  };
};

rest.catch = function (res) {
  return function (err) {
    res.status(500);
    res.end(err.message);
  };
};

module.exports = rest;
