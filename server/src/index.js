/* @flow */

const { GraphQLServer } = require('graphql-yoga')

const schema = require('./schema')

const server = new GraphQLServer({
  schema
})

server.start({
  port: 4000,
  endpoint: '/api',
  playground: '/api/playground',
  subscriptions: '/api/subscriptions',
}, () => {
  console.log('Server is running on localhost:4000')
})
