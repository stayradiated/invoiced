/* @flow */

const db = require('../utils/db')
const Invoice = require('./invoice')

const Invoices = db.Collection.extend({
  model: Invoice
})

module.exports = Invoices
