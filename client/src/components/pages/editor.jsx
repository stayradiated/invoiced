import React from 'react'
import { Query } from 'react-apollo'

import Header from '../editor/header'
import Details from '../editor/details'
import Rows from '../editor/rows'

import { FETCH_SINGLE_INVOICE } from '../../queries'

import './editor.css'

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
  <Query query={FETCH_SINGLE_INVOICE} variables={props}>
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
