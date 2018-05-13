/* @flow */

const { GraphQLServer } = require('graphql-yoga')

const Clients = require('./models/clients')
const clients = Clients.forge()

const Invoices = require('./models/invoices')
const invoices = Invoices.forge()

const Rows = require('./models/rows')
const rows = Rows.forge()

const Snippets = require('./models/snippets')
const snippets = Snippets.forge()

const typeDefs = `
  type Client {
    id: ID
    name: String
    address: String
    city: String
    postcode: String
    invoices: [Invoice]!
  }

  type Invoice {
    id: ID
    client: Client
    number: String
    date: String
    paid: Boolean
    customer: String
    email: String
    site: String
    cost: String
    labour: String
    airmover: String
    rows: [Row]!
  }

  type Row {
    id: ID
    invoice: Invoice
    type: Int
    order: Int
    content: String
  }

  type Snippet {
    id: ID
    shortcut: String
    content: String
  }

  type Query {
    client(id: ID): Client
    clients(first: Int, skip: Int): [Client]!
    invoice(id: ID): Invoice
    invoices(first: Int, skip: Int): [Invoice]!
    row(id: ID): Row
    rows(first: Int, skip: Int): [Row]!
    snippet(id: ID): Snippet
    snippets(first: Int, skip: Int): [Snippet]!
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

  input CreateInvoiceInput {
    number: String
    date: String
    paid: Boolean
    customer: String
    email: String
    site: String
    cost: String
    labour: String
    airmover: String
  }

  input UpdateInvoiceInput {
    id: ID!
    number: String
    date: String
    paid: Boolean
    customer: String
    email: String
    site: String
    cost: String
    labour: String
    airmover: String
  }

  input CreateRowInput {
    type: Int
    order: Int
    content: String
  }

  input UpdateRowInput {
    id: ID!
    type: Int
    order: Int
    content: String
  }

  input CreateSnippetInput {
    shortcut: String
    content: String
  }

  input UpdateSnippetInput {
    id: ID!
    shortcut: String
    content: String
  }

  type Mutation {
    createClient(input: CreateClientInput!): Client!
    createInvoice(input: CreateInvoiceInput!): Invoice!
    createRow(input: CreateRowInput!): Row!
    createSnippet(input: CreateSnippetInput!): Snippet!

    updateClient(input: UpdateClientInput!): Client!
    updateInvoice(input: UpdateInvoiceInput!): Invoice!
    updateRow(input: UpdateRowInput!): Row!
    updateSnippet(input: UpdateSnippetInput!): Snippet!

    destroyClient(input: DestroyClientInput!): Client!
    destroyInvoice(input: DestroyInvoiceInput!): Invoice!
    destroyRow(input: DestroyRowInput!): Row!
    destroySnippet(input: DestroySnippetInput!): Snippet!
  }
`

const resolveItemFromCollection = (collection) => async (_, { id }) => {
  const data = await collection.query({ where: { id } }).fetchOne()
  if (data == null) {
    return null
  }
  return data.toJSON({ shallow: true })
}

const resolvePageFromCollection = (collection) => async (_, { first, skip }) => {
  const data = await collection.fetchPage({ limit: first, offset: skip })
  if (data == null) {
    return []
  }
  return data.toJSON({ shallow: true })
}

const resolveRelatedItem = (collection, table) => async ({ id }) => {
  const model = await collection.query({ where: { id } }).fetchOne()
  const data = await model.related(table).fetch()
  if (data == null) {
    return null
  }
  return data.toJSON({ shallow: true })
}

const resolveCreateMutation = (collection) => async (_, { input }) => {
  const model = await collection.create(input)
  return model.toJSON({ shallow: true })
}

const resolveUpdateMutation = (collection) => async (_, { input }) => {
  const { id } = input
  const model = await collection.query({ where: { id } }).fetchOne()
  await model.save(input)
  return model.toJSON({ shallow: true })
}

const resolveDestroyMutation = (collection) => async (_, { input }) => {
  const { id } = input
  const model = await collection.query({ where: { id } }).fetchOne()
  await model.destroy()
  return null
}

const resolvers = {
  Query: {
    client: resolveItemFromCollection(clients),
    clients: resolvePageFromCollection(clients),
    invoice: resolveItemFromCollection(invoices),
    invoices: resolvePageFromCollection(invoices),
    row: resolvePageFromCollection(rows),
    rows: resolvePageFromCollection(rows),
    snippet: resolvePageFromCollection(snippets),
    snippets: resolvePageFromCollection(snippets)
  },
  Client: {
    invoices: resolveRelatedItem(clients, 'invoices')
  },
  Invoice: {
    client: resolveRelatedItem(invoices, 'client'),
    rows: resolveRelatedItem(invoices, 'rows')
  },
  Row: {
    invoice: resolveRelatedItem(rows, 'invoice')
  },
  Mutation: {
    createClient: resolveCreateMutation(clients),
    createInvoice: resolveCreateMutation(invoices),
    createRow: resolveCreateMutation(rows),
    createSnippet: resolveCreateMutation(snippets),

    updateClient: resolveUpdateMutation(clients),
    updateInvoice: resolveUpdateMutation(invoices),
    updateRow: resolveUpdateMutation(rows),
    updateSnippet: resolveUpdateMutation(snippets),

    destroyClient: resolveDestroyMutation(clients)
    destroyInvoice: resolveDestroyMutation(invoices)
    destroyRow: resolveDestroyMutation(rows)
    destroySnippet: resolveDestroyMutation(snippets)
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })

server.start({
  port: 8080
}, () => {
  console.log('Server is running on localhost:8080')
})
