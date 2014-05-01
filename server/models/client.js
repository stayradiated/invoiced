var MySql = require('../utils/db');
var Invoices = require('./invoices');

var Client = MySql.Model.extend({
  tableName: 'clients',

  hasTimestamps: ['createdAt', 'updatedAt'],

  invoices: function () {
    return this.hasMany(Invoices, 'client');
  }
});

module.exports = Client;
