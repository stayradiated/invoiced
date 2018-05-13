import classNames from 'classnames'
import PropTypes from 'proptypes'
import compose from 'recompose/compose'

import React from 'react'

import AppActions from '../../actions/app'
import ClientModel from '../../models/client'
import ClientStore from '../../stores/client'
import withModel from '../utils/withModel'
import withStore from '../utils/withStore'

import './clientItem.css'

class ClientItem extends React.Component {
  static propTypes = {
    model: PropTypes.instanceOf(ClientModel).isRequired
  }

  constructor (props) {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  render () {
    const { isActive, name, address, city, postcode, invoiceCount } = this.props

    var classes = classNames({
      'ClientItem-container': true,
      'active': isActive
    })

    return (
      <div className={classes} onClick={this.handleClick} >
        <div className='ClientItem-details'>
          <h3 className='ClientItem-title'>{name}</h3>
          <p className='ClientItem-metadata'>
            <span className='ClientItem-address'>{address}</span>
            <span className='ClientItem-city'>{city}</span>
            <span className='ClientItem-postcode'>{postcode}</span>
          </p>
        </div>
        <div className='ClientItem-count number'>{
          invoiceCount
        }</div>
      </div>
    )
  }

  handleClick () {
    AppActions.openClient(this.props.model)
  }

  updateState () {
  }

  _onChange () {
    this.forceUpdate()
  }
}

export default compose(
  withStore(ClientStore, 'change:active', (store, props) => ({
    isActive: props.model === ClientStore.get('active')
  })),
  withModel((props) => props.model.get('invoices'), 'all', (model) => ({
    invoiceCount: model.length
  })),
  withModel((props) => props.model, 'change', (model) => ({
    name: model.get('name'),
    address: model.get('address'),
    city: model.get('city'),
    postcode: model.get('city')
  })),
)(ClientItem)
