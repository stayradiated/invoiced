import React from 'react'
import PropTypes from 'proptypes'
import moment from 'moment'
import numeral from 'numeral'

import AppActions from '../../actions/app'
import InvoiceModel from '../../models/invoice'
import InvoiceRows from './invoiceRows'
import TogglePaidBtn from './togglePaidBtn'

import './invoiceDetails.css'

class InvoiceDetails extends React.Component {
  static propTypes = {
    model: PropTypes.instanceOf(InvoiceModel).isRequired
  }

  constructor () {
    super()
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDestroy = this.handleDestroy.bind(this)
    this.handleExport = this.handleExport.bind(this)
  }

  componentDidMount () {
    this.props.model.on('change', this._onChange, this)
  }

  componentWillUnmount () {
    this.props.model.off('change', this._onChange, this)
  }

  render () {
    return (
      <section className='InvoiceDetails-container'>
        <header className='InvoiceDetails-header'>

          <section className='InvoiceDetails-section'>
            <h3 className='InvoiceDetails-title'>#{this.props.model.get('number')}</h3>
            <div className='InvoiceDetails-value InvoiceDetails-date'>
              <span className='halflings calendar'>{
                moment(this.props.model.get('date')).format('Do MMMM YYYY')
              }</span>
            </div>
            <TogglePaidBtn model={this.props.model} />
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
            <h2>{this.props.model.get('customer')}</h2>
            <h3 className='InvoiceDetails-title'>{this.props.model.get('site')}</h3>
          </div>

          <div className='InvoiceDetails-value InvoiceDetails-email'>Email: {
            this.props.model.get('email')
          }</div>

        </header>

        <InvoiceRows collection={this.props.model.get('rows')} />

        <div className='InvoiceDetails-value InvoiceDetails-customer'>
          <div className='primary'>
            <div className='labour'>Labour: {
              numeral(this.props.model.get('labour')).format('$0,0.00')
            }</div>
          <div className='airmover'>Air Mover: {
            numeral(this.props.model.get('airmover')).format('$0,0.00')
          }</div>
          </div>
          <div className='price number'>{
            numeral(this.props.model.get('cost')).format('$0,0.00')
          }</div>
        </div>

        <section className='InvoiceDetails-section'>
          <div className='InvoiceDetails-value InvoiceDetails-date'>
            <label className='InvoiceDetails-label'>Created:</label>
            {moment(this.props.model.get('createdAt')).calendar()}
          </div>
          <div className='InvoiceDetails-value InvoiceDetails-date'>
            <label className='InvoiceDetails-label'>Last Updated:</label>
            {moment(this.props.model.get('updatedAt')).calendar()}
          </div>
        </section>

        <button className='InvoiceDetails-button subtle' type='button' onClick={this.handleDestroy}>
          <span className='halflings remove'>Delete Invoice</span>
        </button>

      </section>
    )
  }

  handleExport () {
    AppActions.exportInvoice(this.props.model)
  }

  handleDestroy () {
    AppActions.destroyInvoice(this.props.model)
  }

  handleEdit () {
    AppActions.editInvoice(this.props.model)
  }

  _onChange () {
    this.forceUpdate()
  }
}

export default InvoiceDetails
