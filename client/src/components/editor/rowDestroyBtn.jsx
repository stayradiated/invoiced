import React from 'react'
import PropTypes from 'proptypes'

import AppActions from '../../actions/app'
import RowModel from '../../models/row'

class RowDestroyBtn extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(RowModel).isRequired
  }

  render () {
    return (
      <button type='button' tabIndex='-1' className='primary' onClick={this.destroy}>
        <span className='halflings remove' />
      </button>
    )
  }

  destroy () {
    AppActions.destroyRow(this.props.model)
  }
}

export default RowDestroyBtn
