import React from 'react'
import { Route } from 'react-router-dom'

import ClientSection from '../clients/clientSection'
import InvoiceSection from '../clients/invoiceSection'
import InvoiceDetails from '../clients/invoiceDetails'

import './clients.css'

const ClientsPage = () => {
  return (
    <div className='ClientsPage-container'>
      <ClientSection key='client-section' />
      <Route path='/clients/:clientId' component={InvoiceSection} />
      <Route path='/clients/:clientId/invoices/:invoiceId' component={InvoiceDetails} />
    </div>
  )
}

export default ClientsPage
