import React from 'react'
import PropTypes from 'proptypes'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

import InvoiceItem from './invoiceItem'

import './invoiceList.css'

const QUERY = gql`
  query fetchClientInvoices ($clientId: ID!) {
    client(id: $clientId) {
      id
      invoices {
        total
        items {
          id
          customer
          paid
          client {
            id
          }
        }
      }
    }
  }
`

const InvoiceList = (props) => {
  const { invoiceList } = props

  var content = []
  var paid = []
  var unpaid = []

  invoiceList.items.forEach((invoice) => {
    var item = (
      <InvoiceItem key={invoice.id} invoice={invoice} />
    )
    if (invoice.paid) {
      paid.unshift(item)
    } else {
      unpaid.unshift(item)
    }
  })

  if (unpaid.length) {
    content.push(
      <section className='InvoiceList-section' key='unpaid'>
        <h5 className='InvoiceList-sectionTitle'>Unpaid</h5>
        {unpaid}
      </section>
    )
  }

  if (paid.length) {
    content.push(
      <section className='InvoiceList-section' key='paid'>
        <h5 className='InvoiceList-sectionTitle'>Paid</h5>
        {paid}
      </section>
    )
  }

  return (
    <div className='InvoiceList-container scrollable'>
      {content}
    </div>
  )
}

const withInvoices = (Component) => (props) => (
  <Query query={QUERY} variables={props}>
    {({ data, loading }) => {
      if (loading) {
        return 'loading...'
      }
      return <Component invoiceList={data.client.invoices} />
    }}
  </Query>
)

export default withInvoices(InvoiceList)
