/* @flow */

const db = require('../utils/db')

const { Client } = require('./client')

const Clients = db.Collection.extend({
  model: Client
})

module.exports = {
  Clients,
  clients: Clients.forge()
}
