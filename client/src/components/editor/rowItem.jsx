import React from 'react'

import ROW from '../../constants/row'
import RowInput from './rowInput'
import RowDestroyBtn from './rowDestroyBtn'
import RowSwitchBtn from './rowSwitchBtn'

const RowItem = () => (
  <div className='row item'>
    <span className='bullet'>{this.props.index}</span>
    <RowInput model={this.props.model} />
    <RowSwitchBtn model={this.props.model} next={ROW.BULLET} />
    <RowDestroyBtn model={this.props.model} />
  </div>
)

export default RowItem
