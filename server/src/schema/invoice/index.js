const { type, typeMutation, typeQuery } = require('./type')
const { queries } = require('./queries')
const { resolvers } = require('./resolvers')
const { mutations } = require('./mutations')

module.exports = {
  type,
  typeMutation,
  typeQuery,
  queries,
  mutations,
  resolvers
}
