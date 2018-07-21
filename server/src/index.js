/* @flow */

const { GraphQLServer } = require('graphql-yoga')

const schema = require('./schema')

const server = new GraphQLServer({ schema })

server.start({
  port: 8080
}, () => {
  console.log('Server is running on localhost:8080')
})
