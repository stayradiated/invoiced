var MySql = require('../utils/db');
var Rows = require('./rows');

var Invoice = MySql.Model.extend({
  tableName: 'invoices',

  hasTimestamps: ['createdAt', 'updatedAt'],

  client: function () {
    var Client = require('./client');
    return this.belongsTo(Client, 'client');
  },

  rows: function () {
    return this.hasMany(Rows, 'invoice');
  }

});

module.exports = Invoice;
