import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

import SnippetItem from './snippetEditItem'

const QUERY = gql`
  query fetchSnippets {
    snippets {
      items {
        id
        shortcut
        content
      }
    }
  }
`

const SnippetList = (props) => {
  const { snippetList } = props

  const snippetItems = snippetList.map((snippet) => (
    <SnippetItem key={snippet.id} snippet={snippet} />
  ))

  return (
    <div className='snippet-list'>{snippetItems}</div>
  )
}

const withSnippetList = (Component) => () => (
  <Query query={QUERY}>
    {({ data, loading }) => {
      if (loading) {
        return 'loading...'
      }
      return <Component snippetList={data.snippets.items} />
    }}
  </Query>
)

export default withSnippetList(SnippetList)
