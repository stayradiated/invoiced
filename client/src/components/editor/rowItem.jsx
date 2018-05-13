import React from 'react'
import PropTypes from 'proptypes'

import ROW from '../../constants/row'
import RowInput from './rowInput'
import RowDestroyBtn from './rowDestroyBtn'
import RowSwitchBtn from './rowSwitchBtn'
import RowModel from '../../models/row'

class RowItem extends React.Component {

  static propTypes = {
    index: PropTypes.number.isRequired,
    model: PropTypes.instanceOf(RowModel).isRequired
  }

  render () {
    return (
      <div className='row item'>
        <span className='bullet'>{this.props.index}</span>
        <RowInput model={this.props.model} />
        <RowSwitchBtn model={this.props.model} next={ROW.BULLET} />
        <RowDestroyBtn model={this.props.model} />
      </div>
    )
  }
}

export default RowItem
