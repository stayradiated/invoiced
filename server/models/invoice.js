var MySql = require('../utils/db');

var Invoice = MySql.Model.extend({
  tableName: 'invoices',

  hasTimestamps: ['createdAt', 'updatedAt'],

  client: function () {
    var Client = require('./client');
    return this.belongsTo(Client, 'client');
  }
});

module.exports = Invoice;
