import React from 'react'
import PropTypes from 'proptypes'

import AppActions from '../../actions/app'
import ClientModel from '../../models/client'
import withModel from '../utils/withModel'

import './clientDetails.css'

class ClientDetails extends React.Component {
  static propTypes = {
    model: PropTypes.instanceOf(ClientModel).isRequired
  }

  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
  }

  render () {
    const { name, address, city, postcode } = this.props

    return (
      <header className='ClientDetails-container'>
        <div className='ClientDetails-details'>
          <h2 className='ClientDetails-title'>{name}</h2>
          <p className='ClientDetails-metadata'>
            <span>{address}</span>
            <span>{city}</span>
            <span>{postcode}</span>
          </p>
        </div>
        <div className='ClientDetails-buttons'>
          <button className='ClientDetails-button secondary' type='button' onClick={this.handleClick}>
            <span className='halflings pencil'>Edit Details</span>
          </button>
          <button className='ClientDetails-button primary' type='button'
            onClick={this.handleCreate}>
            <span className='halflings plus-sign'>New Invoice</span>
          </button>
        </div>
      </header>
    )
  }

  handleClick () {
    AppActions.editClient(this.props.model)
  }

  handleCreate () {
    AppActions.createInvoice(this.props.model)
  }
}

export default withModel((props) => props.model, 'change', (model) => ({
  name: model.get('name'),
  address: model.get('address'),
  city: model.get('city'),
  postcode: model.get('city')
}))(ClientDetails)
