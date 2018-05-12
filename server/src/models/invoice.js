/* @flow */

const db = require('../utils/db')
const Rows = require('./rows')

const Invoice = db.Model.extend({
  tableName: 'invoices',

  hasTimestamps: ['createdAt', 'updatedAt'],

  client: function () {
    const Client = require('./client')
    return this.belongsTo(Client, 'client')
  },

  rows: function () {
    return this.hasMany(Rows, 'invoice')
  }

})

module.exports = Invoice
