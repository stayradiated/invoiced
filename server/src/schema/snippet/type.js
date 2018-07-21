const type = `
  type Snippet {
    id: ID
    shortcut: String
    content: String
  }

  type SnippetList {
    items: [Snippet]!
    total: Int!
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

  input DestroySnippetInput {
    id: ID!
  }
`

const typeQuery = `
  snippet(id: ID): Snippet
  snippets(first: Int, skip: Int): SnippetList!
`

const typeMutation = `
  createSnippet(input: CreateSnippetInput!): Snippet!
  updateSnippet(input: UpdateSnippetInput!): Snippet!
  destroySnippet(input: DestroySnippetInput!): Boolean!
`

module.exports = {
  type,
  typeQuery,
  typeMutation
}
