import React from 'react'
import { Query } from 'react-apollo'

import InvoiceItem from './invoiceItem'

import { FETCH_CLIENT_INVOICES } from '../../queries'

import './invoiceList.css'

const InvoiceList = (props) => {
  const { invoiceList } = props

  const invoiceItems = invoiceList.items.map((invoice) => (
    <InvoiceItem key={invoice.id} invoice={invoice} />))

  return (
    <div className='InvoiceList-container scrollable'>
      <section className='InvoiceList-section' key='paid'>
        <h5 className='InvoiceList-sectionTitle'>Invoices</h5>
        {invoiceItems}
      </section>
    </div>
  )
}

const withInvoices = (Component) => (props) => (
  <Query query={FETCH_CLIENT_INVOICES} variables={props}>
    {({ data, loading }) => {
      if (loading) {
        return 'loading...'
      }
      return <Component invoiceList={data.client.invoices} />
    }}
  </Query>
)

export default withInvoices(InvoiceList)
