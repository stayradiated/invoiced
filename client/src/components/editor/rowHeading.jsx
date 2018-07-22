import React from 'react'

import ROW from '../../constants/row'
import RowInput from './rowInput'
import RowDestroyBtn from './rowDestroyBtn'
import RowSwitchBtn from './rowSwitchBtn'

const RowHeading = () => (
  <div className='row heading'>
    <RowInput model={this.props.model} />
    <RowSwitchBtn model={this.props.model} next={ROW.ITEM} />
    <RowDestroyBtn model={this.props.model} />
  </div>
)

export default RowHeading
