import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

import Header from '../editor/header'
import Details from '../editor/details'
import Rows from '../editor/rows'

import './editor.css'

const QUERY = gql`
  query fetchInvoiceDetails ($invoiceId: ID!) {
    invoice(id: $invoiceId) {
      id
      number
      date
      customer
      site
      email
      airmover
      labour
      cost
      createdAt
      updatedAt
      rows {
        items {
          id
        }
      }
    }
  }
`

const EditorPage = (props) => {
  const { invoice } = props

  return (
    <div className='EditorPage-container'>
      <Details invoice={invoice} />
      <div className='EditorPage-editor'>
        <Header invoice={invoice} />
        <Rows rows={invoice.rows.items} />
      </div>
    </div>
  )
}

const withInvoice = (Component) => (props) => (
  <Query query={QUERY} variables={props}>
    {({ data, loading }) => {
      if (loading) {
        return 'loading...'
      }
      return <Component invoice={data.invoice} />
    }}
  </Query>
)

const withInvoiceId = (Component) => (props) => {
  const { match } = props
  const { invoiceId } = match.params
  return <Component invoiceId={invoiceId} />
}

export default withInvoiceId(withInvoice(EditorPage))
