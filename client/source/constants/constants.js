// replace null values with the key name
var _ = require('lodash');
module.exports = function (data) {
  return _.forIn(data, function (val, key, obj) { 
    if (val === null) {
      obj[key] = key;
    }
  });
};
