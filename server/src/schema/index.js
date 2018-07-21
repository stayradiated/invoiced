const { default: Saturn } = require('saturn-gql')
const { makeExecutableSchema } = require('graphql-tools')

const saturn = new Saturn(__dirname)
const saturnSchema = saturn.makeSchema()

let schema
try {
  schema = makeExecutableSchema(saturnSchema)
} catch (err) {
  console.log(saturnSchema.typeDefs)
  throw err
}

module.exports = schema
