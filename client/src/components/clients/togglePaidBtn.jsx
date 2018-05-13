import React from 'react'
import PropTypes from 'proptypes'

import InvoiceModel from '../../models/invoice'

class TogglePaidBtn extends React.Component {
  static propTypes = {
    model: PropTypes.instanceOf(InvoiceModel).isRequired
  }

  constructor () {
    super()
    this.handleToggle = this.handleToggle.bind(this)
  }

  componentDidMount () {
    this.props.model.on('change', this._onChange, this)
  }

  componentWillUnmount () {
    this.props.model.off('change', this._onChange, this)
  }

  render () {
    var classes = this.props.model.get('paid') ? 'subtle' : 'primary'

    return (
      <button className={classes} type='button' onClick={this.handleToggle}>{
        this.props.model.get('paid') ? (
          <span className='halflings ok'>Paid</span>
        ) : (
          <span className='halflings remove'>Unpaid</span>
        )
      }</button>
    )
  }

  handleToggle () {
    this.props.model.save({
      paid: this.props.model.get('paid') ? 0 : 1
    })
  }

  _onChange () {
    this.forceUpdate()
  }
}

export default TogglePaidBtn
