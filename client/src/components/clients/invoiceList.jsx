import React from 'react'
import PropTypes from 'proptypes'

import InvoiceItem from './invoiceItem'
import InvoiceStore from '../../stores/invoice'
import InvoiceCollection from '../../models/invoices'

import './invoiceList.css'

const getState = () => ({
  active: InvoiceStore.get('active')
})

class InvoiceList extends React.Component {

  static propTypes = {
    collection: PropTypes.instanceOf(InvoiceCollection).isRequired
  }

  constructor () {
    super()
    this.state = getState()
  }

  componentDidMount () {
    this.props.collection.on('add remove change:paid', this._onChange, this)
  }

  componentWillUnmount () {
    this.props.collection.off('add remove change:paid', this._onChange, this)
  }

  render () {
    var content = []
    var paid = []
    var unpaid = []

    this.props.collection.forEach((invoice) => {
      var item = (
        <InvoiceItem key={invoice.cid} model={invoice} />
      )
      if (invoice.get('paid')) {
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
      <div className='InvoiceList-container scrollable'>{content}</div>
    )
  }

  _onChange () {
    this.setState(getState())
  }
}

export default InvoiceList
