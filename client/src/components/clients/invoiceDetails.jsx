import React from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { Mutation, Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import { compose, withHandlers } from 'recompose'

import InvoiceRows from './invoiceRows'
import TogglePaidBtn from './togglePaidBtn'

import {
  clientFragment,
  FETCH_SINGLE_INVOICE,
  DESTROY_INVOICE
} from '../../queries'

import './invoiceDetails.css'

const handleDestroy = (props) => () => {
  const { history, invoice, destroyInvoice } = props

  history.push(`/clients/${invoice.client.id}`)

  destroyInvoice({
    variables: {
      input: {
        id: invoice.id
      }
    },
    update: (cache, { data }) => {
      const id = `Client:${invoice.client.id}`

      const prev = cache.readFragment({
        id,
        fragment: clientFragment
      })

      const next = {
        ...prev,
        invoices: {
          ...prev.invoices,
          items: prev.invoices.items.filter((item) =>
            item.id !== invoice.id)
        }
      }

      cache.writeFragment({
        id,
        fragment: clientFragment,
        data: next
      })
    }
  })
}

const InvoiceDetails = (props) => {
  const { invoice, onDestroy } = props

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
          <Link
            className='InvoiceDetails-button secondary'
            to={`/editor/${invoice.id}`}
          >
            <span className='halflings pencil'>Edit Invoice</span>
          </Link>
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

      <button className='InvoiceDetails-button subtle' type='button' onClick={onDestroy}>
        <span className='halflings remove'>Delete Invoice</span>
      </button>

    </section>
  )
}

const withInvoice = (Component) => (props) => (
  <Query query={FETCH_SINGLE_INVOICE} variables={props}>
    {({ data, loading }) => {
      if (loading) {
        return 'loading...'
      }
      return <Component {...props} invoice={data.invoice} />
    }}
  </Query>
)

const withDestroyInvoice = (Component) => (props) => (
  <Mutation mutation={DESTROY_INVOICE}>
    {(destroyInvoice) => (
      <Component {...props} destroyInvoice={destroyInvoice} />
    )}
  </Mutation>
)

const withInvoiceId = (Component) => (props) => {
  const { match } = props
  const { invoiceId } = match.params
  return <Component {...props} invoiceId={invoiceId} />
}


export default compose(
  withInvoiceId,
  withInvoice,
  withDestroyInvoice,
  withHandlers({
    onDestroy: handleDestroy
  })
)(InvoiceDetails)
