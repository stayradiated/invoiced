var rest = function (res) {
  return function (rows) {
    res.end(JSON.stringify(rows, null, 2));
  };
};

rest.catch = function (res) {
  return function (err) {
    res.status(500);
    res.end(err.message);
  };
};

module.exports = rest;
