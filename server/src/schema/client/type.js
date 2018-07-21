const type = `
  type Client {
    id: ID!
    name: String
    address: String
    city: String
    postcode: String
    createdAt: String
    updatedAt: String
    invoices(first: Int, skip: Int): InvoiceList!
  }

  type ClientList {
    items: [Client]!
    total: Int!
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
  clients(first: Int, skip: Int): ClientList!
`

const typeMutation = `
  createClient(input: CreateClientInput!): Client!
  updateClient(input: UpdateClientInput!): Client!
  destroyClient(input: DestroyClientInput!): Boolean!
`

module.exports = {
  type,
  typeQuery,
  typeMutation
}
