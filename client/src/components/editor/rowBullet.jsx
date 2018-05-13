import React from 'react'
import PropTypes from 'proptypes'

import ROW from '../../constants/row'
import RowInput from './rowInput'
import RowDestroyBtn from './rowDestroyBtn'
import RowSwitchBtn from './rowSwitchBtn'
import RowModel from '../../models/row'

class RowBullet extends React.Component {
  static propTypes = {
    model: PropTypes.instanceOf(RowModel).isRequired
  }

  render () {
    return (
      <div className='row bullet'>
        <span className='bullet'>•</span>
        <RowInput model={this.props.model} />
        <RowSwitchBtn model={this.props.model} next={ROW.HEADING} />
        <RowDestroyBtn model={this.props.model} />
      </div>
    )
  }
}

export default RowBullet
