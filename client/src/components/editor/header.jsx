import React from 'react'
import PropTypes from 'proptypes'

import ROW from '../../constants/row'
import InvoiceModel from '../../models/invoice'
import AppActions from '../../actions/app'

class Header extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(InvoiceModel).isRequired
  }

  render () {
    window.invoice = this.props.model

    return (
      <header>
        <ul className='rows'>
          <li onClick={this.createRow.bind(this, ROW.ITEM)}>Item</li>
          <li onClick={this.createRow.bind(this, ROW.BULLET)}>Bullet</li>
          <li onClick={this.createRow.bind(this, ROW.HEADING)}>Heading</li>
          <li onClick={this.createRow.bind(this, ROW.DATE)}>Date</li>
        </ul>
        <ul className='invoice'>
          <li onClick={this.revert}>
            <span className='halflings repeat' />
            Revert
          </li>
          <li onClick={this.save}>
            <span className='halflings floppy_disk' />
            Save
          </li>
          <li>Templates</li>
          <li onClick={this.export}>
            <span className='halflings print' />
            Export
          </li>
        </ul>
      </header>
    )
  }

  export () {
    AppActions.exportInvoice(this.props.model)
  }

  revert () {
    console.log('Reverting rows')
    this.props.model.restore()
    this.props.model.get('rows').restore()
    this.save()
  }

  save () {
    this.props.model.store()
    this.props.model.get('rows').save()
  }

  createRow (type) {
    AppActions.createRow(this.props.model, type)
  }
}

export default Header
