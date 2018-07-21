const { resolveRelatedItem } = require('../../utils/resolve')

const { rows } = require('../../models/rows')

const resolvers = {
  Row: {
    invoice: resolveRelatedItem(rows, 'invoice')
  }
}

module.exports = { resolvers }
