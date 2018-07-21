/* @flow */

const db = require('../utils/db')

const Row = db.Model.extend({
  tableName: 'rows',

  invoice: function () {
    const { Invoice } = require('./invoice')
    return this.belongsTo(Invoice, 'invoice')
  }
})

module.exports = { Row }
