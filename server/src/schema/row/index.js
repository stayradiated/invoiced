const { type, typeMutation, typeQuery } = require('./type')
const { queries, resolvers } = require('./queries')
const { mutations } = require('./mutations')

module.exports = {
  type,
  typeMutation,
  typeQuery,
  queries,
  mutations,
  resolvers
}
