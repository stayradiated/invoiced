const {
  resolveItemFromCollection,
  resolvePageFromCollection
} = require('../../utils/resolve')

const { snippets } = require('../../models/snippets')

const queries = {
  snippet: resolveItemFromCollection(snippets),
  snippets: resolvePageFromCollection(snippets)
}

module.exports = { queries }
