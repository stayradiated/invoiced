import React from 'react'

import ClientSection from '../clients/clientSection'
import InvoiceSection from '../clients/invoiceSection'
import InvoiceDetails from '../clients/invoiceDetails'
import ClientStore from '../../stores/client'
import InvoiceStore from '../../stores/invoice'

import './clients.css'

const getState = () => ({
  client: ClientStore.get('active'),
  invoice: InvoiceStore.get('active')
})

class ClientsPage extends React.Component {
  constructor () {
    super()
    this.state = getState()
  }

  componentDidMount () {
    ClientStore.on('change:active', this._onChange, this)
    InvoiceStore.on('change:active', this._onChange, this)
  }

  componentWillUnmount () {
    ClientStore.off('change:active', this._onChange, this)
    InvoiceStore.off('change:active', this._onChange, this)
  }

  render () {
    var sections = [
      <ClientSection key='client-section' />
    ]

    if (this.state.client) {
      sections.push(<InvoiceSection
        key={'invoice-section' + this.state.client.cid}
        model={this.state.client}
      />)
    }
    
    if (this.state.invoice) {
      sections.push(<InvoiceDetails
        key={'invoice-details' + this.state.invoice.cid}
        model={this.state.invoice}
      />)
    }

    return (
      <div className='ClientsPage-container'>{sections}</div>
    )
  }

  _onChange () {
    this.setState(getState())
  }
}

export default ClientsPage
