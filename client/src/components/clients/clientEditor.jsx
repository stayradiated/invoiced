import React from 'react'
import PropTypes from 'proptypes'
import compose from 'recompose/compose'

import AppActions from '../../actions/app'
import ClientStore from '../../stores/client'
import ClientModel from '../../models/client'
import withModel from '../utils/withModel'
import withStore from '../utils/withStore'

import './clientEditor.css'

class ClientEditor extends React.Component {
  static propTypes = {
    model: PropTypes.instanceOf(ClientModel).isRequired
  }

  constructor () {
    super()
    this.handleHide = this.handleHide.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDestroy = this.handleDestroy.bind(this)
  }

  render () {
    const { showEditor, name, address, city, postcode } = this.props

    if (showEditor === false) {
      return null
    }

    return (
      <div className='ClientEditor-container'>
        <div className='ClientEditor-row'>
          <label className='ClientEditor-label'>Name</label>
          <input className='ClientEditor-input' placeholder='Name' ref='name'
            defaultValue={name} />
        </div>
        <div className='ClientEditor-row'>
          <label className='ClientEditor-label'>Address</label>
          <input className='ClientEditor-input' placeholder='Address' ref='address'
            defaultValue={address} />
        </div>
        <div className='ClientEditor-row'>
          <label className='ClientEditor-label'>City</label>
          <input className='ClientEditor-input' placeholder='City' ref='city'
            defaultValue={city} />
        </div>
        <div className='ClientEditor-row'>
          <label className='ClientEditor-label'>Post Code</label>
          <input className='ClientEditor-input' placeholder='Post Code' ref='postcode'
            defaultValue={postcode} />
        </div>
        <div className='ClientEditor-buttons'>
          <button className='ClientEditor-button' onClick={this.handleHide}>
            <span className='halflings remove' />
            Cancel
          </button>
          <button className='ClientEditor-button primary' onClick={this.handleSave}>
            <span className='halflings ok' />
            Save
          </button>
          <button className='ClientEditor-button text' onClick={this.handleDestroy}>
            <span className='halflings trash' />
            Destroy
          </button>
        </div>
      </div>
    )
  }

  handleHide () {
    AppActions.openClient(this.props.model)
  }

  handleSave () {
    this.props.model.save({
      name: this.refs.name.value,
      address: this.refs.address.value,
      city: this.refs.city.value,
      postcode: this.refs.postcode.value
    })
    this.hide()
  }

  handleDestroy () {
    AppActions.destroyClient(this.props.model)
  }
}

export default compose(
  withStore(ClientStore, 'change:editMode', (store) => ({
    showEditor: store.get('editMode')
  })),
  withModel((props) => props.model, 'change', (model) => ({
    name: model.get('name'),
    address: model.get('address'),
    city: model.get('city'),
    postcode: model.get('city')
  }))
)(ClientEditor)
