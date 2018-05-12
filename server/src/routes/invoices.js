/* @flow */

const Route = require('../utils/route')
const Invoices = require('../models/invoices')
const rest = require('../utils/rest')
const docx = require('../utils/docx')

const invoices = new Route({
  collection: Invoices,
  columns: [
    'client', 'number', 'date', 'paid', 'customer', 'email', 'site',
    'cost', 'labour', 'airmover'
  ]
})

invoices.addRelation('rows')
invoices.addRelation('client')

invoices.addRoute('get', '/docx/:id', async (req, res) => {
  const invoice = invoices.collection.get(req.params.id)
  if (!invoice) {
    return rest.fail(res, new Error('Could not find model'))
  }

  try {
    const data = await docx(invoice)
    rest.end(res, data)
  } catch (err) {
    rest.fail(res, err)
  }
})

module.exports = invoices
