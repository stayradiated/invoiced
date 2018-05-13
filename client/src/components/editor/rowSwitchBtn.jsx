import React from 'react'
import PropTypes from 'proptypes'

import RowModel from '../../models/row'

class RowSwitchBtn extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(RowModel).isRequired,
    next: PropTypes.number
  }

  render () {
    return (
      <button type='button' tabIndex='-1' onClick={this.switchType}>
        <span className='halflings refresh' />
      </button>
    )
  }

  switchType () {
    this.props.model.set('type', this.props.next)
  }
}

export default RowSwitchBtn
