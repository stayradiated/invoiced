import classNames from 'classnames'
import PropTypes from 'proptypes'

import React from 'react'
import moment from 'moment'
import numeral from 'numeral'

import AppActions from '../../actions/app'
import InvoiceModel from '../../models/invoice'
import InvoiceStore from '../../stores/invoice'

import './invoiceItem.css'

class InvoiceItem extends React.Component {
  static propTypes = {
    model: PropTypes.instanceOf(InvoiceModel).isRequired
  }

  constructor (props) {
    super()
    this.state = {
      active: props.model === InvoiceStore.get('active')
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    InvoiceStore.on('change:active', this.updateState, this)
    this.props.model.on('change', this._onChange, this)
  }

  componentWillUnmount () {
    InvoiceStore.off('change:active', this.updateState, this)
    this.props.model.off('change', this._onChange, this)
  }

  render () {
    var classes = classNames({
      'InvoiceItem': true,
      'active': this.state.active
    })

    return (
      <div className={classes} onClick={this.handleClick}>
        <div className='InvoiceItem-metadata'>
          <h3 className='InvoiceItem-title number'>#{
            this.props.model.get('number')
          }</h3>
          <div className='InvoiceItem-value InvoiceItem-created'>
            <span className='halflings calendar'>{
              moment(this.props.model.get('date')).format('Do MMMM YYYY')
            }</span>
          </div>
          <div className='InvoiceItem-value InvoiceItem-status'>{
            this.props.model.get('paid') ? (
              <span className='halflings ok paid'>Paid</span>
            ):(
              <span className='halflings remove not-paid'>Not Paid</span>
            )
          }</div>
        </div>
        <div className='InvoiceItem-value InvoiceItem-customer'>
          <div className='InvoiceItem-primary'>
            <h3 className='InvoiceItem-customerName'>{this.props.model.get('customer')}</h3>
            <h5 className='InvoiceItem-customerSite'>{this.props.model.get('site')}</h5>
          </div>
          <div className='InvoiceItem-price number'>
            {numeral(this.props.model.get('cost')).format('$0,0.00')}
          </div>
        </div>
      </div>
    )
  }

  handleClick () {
    AppActions.openInvoice(this.props.model)
  }

  updateState () {
    this.setState({
      active: this.props.model === InvoiceStore.get('active')
    })
  }

  _onChange () {
    this.forceUpdate()
  }
}

export default InvoiceItem
