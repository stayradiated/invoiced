import React from 'react'
import PropTypes from 'proptypes'

import ClientDetails from './clientDetails'
import InvoiceList from './invoiceList'
// import ClientEditor from './clientEditor'

import './invoiceSection.css'

const InvoiceSection = (props) => {
  const { match } = props
  const { clientId } = match.params

  return (
    <section className='InvoiceSection-container'>
      <ClientDetails clientId={clientId} />
      {/* <ClientEditor model={model} /> */}
      <InvoiceList clientId={clientId} />
    </section>
  )
}

export default InvoiceSection
