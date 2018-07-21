/* @flow */

const db = require('../utils/db')

const { Invoices } = require('./invoices')

const Client = db.Model.extend({
  tableName: 'clients',

  hasTimestamps: ['createdAt', 'updatedAt'],

  invoices: function () {
    return this.hasMany(Invoices, 'client')
  }
})

module.exports = {
  Client
}
