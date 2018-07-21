const {
  resolveItemFromCollection,
  resolvePageFromCollection
} = require('../../utils/resolve')

const { rows } = require('../../models/rows')

const queries = {
  row: resolveItemFromCollection(rows),
  rows: resolvePageFromCollection(rows)
}

module.exports = { queries }
