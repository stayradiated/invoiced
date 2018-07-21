import classNames from 'classnames'
import PropTypes from 'proptypes'
import { Link } from 'react-router-dom'

import React from 'react'
import moment from 'moment'
import numeral from 'numeral'

import './invoiceItem.css'

const InvoiceItem = (props) => {
  const { invoice } = props

  const classes = classNames('InvoiceItem')

  return (
    <Link
      to={`/clients/${invoice.client.id}/invoices/${invoice.id}`}
      className={classes}
    >
      <div className='InvoiceItem-metadata'>
        <h3 className='InvoiceItem-title number'>#{
          invoice.number
        }</h3>
        <div className='InvoiceItem-value InvoiceItem-created'>
          <span className='halflings calendar'>{
            moment(invoice.date).format('Do MMMM YYYY')
          }</span>
        </div>
        <div className='InvoiceItem-value InvoiceItem-status'>{
          invoice.paid ? (
            <span className='halflings ok paid'>Paid</span>
          ):(
            <span className='halflings remove not-paid'>Not Paid</span>
          )
        }</div>
      </div>
      <div className='InvoiceItem-value InvoiceItem-customer'>
        <div className='InvoiceItem-primary'>
          <h3 className='InvoiceItem-customerName'>{invoice.customer}</h3>
          <h5 className='InvoiceItem-customerSite'>{invoice.site}</h5>
        </div>
        <div className='InvoiceItem-price number'>
          {numeral(invoice.cost).format('$0,0.00')}
        </div>
      </div>
    </Link>
  )
}

export default InvoiceItem
