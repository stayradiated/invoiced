const {
  resolveCreateMutation,
  resolveUpdateMutation,
  resolveDestroyMutation
} = require('../../utils/resolve')

const { snippets } = require('../../models/snippets')

const mutations = {
  createSnippet: resolveCreateMutation(snippets),
  updateSnippet: resolveUpdateMutation(snippets),
  destroySnippet: resolveDestroyMutation(snippets)
}

module.exports = { mutations }
