import React from 'react'
import PropTypes from 'proptypes'

import ClientDetails from './clientDetails'
import InvoiceList from './invoiceList'
import ClientEditor from './clientEditor'
import ClientModel from '../../models/client'

import './invoiceSection.css'

class InvoiceSection extends React.Component {
  static propTypes = {
    model: PropTypes.instanceOf(ClientModel)
  }

  render () {
    const { model } = this.props

    if (model == null) {
      return null
    }

    return (
      <section className='InvoiceSection-container'>
        <ClientDetails model={model} />
        <ClientEditor model={model} />
        <InvoiceList collection={model.get('invoices')} />
      </section>
    )
  }
}

export default InvoiceSection
