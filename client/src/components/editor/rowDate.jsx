import React from 'react'
import PropTypes from 'proptypes'

import RowInput from './rowInput'
import RowDestroyBtn from './rowDestroyBtn'
import RowModel from '../../models/row'

class RowDate extends React.Component {
  static propTypes = {
    model: PropTypes.instanceOf(RowModel).isRequired
  }

  render () {
    return (
      <div className='row date'>
        <span>Job Date:</span>
        <RowInput model={this.props.model} type='date' />
        <div className='fill'></div>
        <RowDestroyBtn model={this.props.model} />
      </div>
    )
  }
}

export default RowDate
