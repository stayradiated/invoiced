const type = `
  type Row {
    id: ID
    invoice: Invoice
    type: Int
    order: Int
    content: String
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
  rows(first: Int, skip: Int): [Row]!
`

const typeMutation = `
  createRow(input: CreateRowInput!): Row!
  updateRow(input: UpdateRowInput!): Row!
  destroyRow(input: DestroyRowInput!): Row!
`

module.exports = {
  type,
  typeQuery,
  typeMutation
}
