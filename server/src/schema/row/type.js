const type = `
  type Row {
    id: ID!
    invoice: Invoice
    type: Int
    order: Int
    content: String
  }

  type RowList {
    items: [Row]!
    total: Int!
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

  input DestroyRowInput {
    id: ID!
  }
`

const typeQuery = `
  row(id: ID): Row
  rows(first: Int, skip: Int): RowList!
`

const typeMutation = `
  createRow(input: CreateRowInput!): Row!
  updateRow(input: UpdateRowInput!): Row!
  destroyRow(input: DestroyRowInput!): Boolean!
`

module.exports = {
  type,
  typeQuery,
  typeMutation
}
