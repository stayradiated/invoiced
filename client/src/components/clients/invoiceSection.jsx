import React from 'react'
import { compose, withHandlers } from 'recompose'

import ClientDetails from './clientDetails'
import InvoiceList from './invoiceList'
import ClientEditor from './clientEditor'

import './invoiceSection.css'

const handleDestroyClient = (props) => () => {
  const { history } = props
  history.push('/clients')
}

const InvoiceSection = (props) => {
  const { match, onDestroyClient } = props
  const { clientId } = match.params

  return (
    <section className='InvoiceSection-container'>
      <ClientDetails clientId={clientId} />
      <ClientEditor
        key={clientId}
        clientId={clientId} 
        onDestroy={onDestroyClient}
      />
      <InvoiceList clientId={clientId} />
    </section>
  )
}

export default compose(
  withHandlers({
    onDestroyClient: handleDestroyClient
  })
)(InvoiceSection)
