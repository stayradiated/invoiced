const type = `
  type Client {
    id: ID!
    name: String!
    address: String!
    city: String!
    postcode: String!
    invoices: [Invoice]!
  }

  input CreateClientInput {
    name: String
    address: String
    city: String
    postcode: String
  }

  input UpdateClientInput {
    id: ID!
    name: String
    address: String
    city: String
    postcode: String
  }

  input DestroyClientInput {
    id: ID!
  }
`

const typeQuery = `
  client(id: ID): Client
  clients(first: Int, skip: Int): [Client]!
`

const typeMutation = `
  createClient(input: CreateClientInput!): Client!
  updateClient(input: UpdateClientInput!): Client!
  destroyClient(input: DestroyClientInput!): Client!
`

module.exports = {
  type,
  typeQuery,
  typeMutation
}
