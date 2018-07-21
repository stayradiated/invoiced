import React from 'react'
import PropTypes from 'proptypes'
import moment from 'moment'
import numeral from 'numeral'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

import InvoiceRows from './invoiceRows'
import TogglePaidBtn from './togglePaidBtn'

import './invoiceDetails.css'

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

const InvoiceDetails = (props) => {
  const { invoice } = props

  return (
    <section className='InvoiceDetails-container'>
      <header className='InvoiceDetails-header'>

        <section className='InvoiceDetails-section'>
          <h3 className='InvoiceDetails-title'>#{invoice.number}</h3>
          <div className='InvoiceDetails-value InvoiceDetails-date'>
            <span className='halflings calendar'>{
              moment(invoice.date).format('Do MMMM YYYY')
            }</span>
          </div>
          <TogglePaidBtn invoice={invoice} />
        </section>

        <section className='InvoiceDetails-section'>
          <button className='InvoiceDetails-button secondary' type='button' onClick={this.handleEdit}>
            <span className='halflings pencil'>Edit Invoice</span>
          </button>
          <button className='InvoiceDetails-button secondary' type='button' onClick={this.handleExport}>
            <span className='halflings print'>Open in Word</span>
          </button>
        </section>

        <div className='InvoiceDetails-value InvoiceDetails-customer'>
          <h2>{invoice.customer}</h2>
          <h3 className='InvoiceDetails-title'>{invoice.site}</h3>
        </div>

        <div className='InvoiceDetails-value InvoiceDetails-email'>Email: {
          invoice.email
        }</div>

      </header>

      <InvoiceRows collection={invoice.rows} />

      <div className='InvoiceDetails-value InvoiceDetails-customer'>
        <div className='primary'>
          <div className='labour'>Labour: {
            numeral(invoice.labour).format('$0,0.00')
          }</div>
        <div className='airmover'>Air Mover: {
          numeral(invoice.airmover).format('$0,0.00')
        }</div>
        </div>
        <div className='price number'>{
          numeral(invoice.cost).format('$0,0.00')
        }</div>
      </div>

      <section className='InvoiceDetails-section'>
        <div className='InvoiceDetails-value InvoiceDetails-date'>
          <label className='InvoiceDetails-label'>Created:</label>
          {moment(invoice.createdAt).calendar()}
        </div>
        <div className='InvoiceDetails-value InvoiceDetails-date'>
          <label className='InvoiceDetails-label'>Last Updated:</label>
          {moment(invoice.updatedAt).calendar()}
        </div>
      </section>

      <button className='InvoiceDetails-button subtle' type='button' onClick={this.handleDestroy}>
        <span className='halflings remove'>Delete Invoice</span>
      </button>

    </section>
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


export default withInvoiceId(withInvoice(InvoiceDetails))
