import React from 'react'
import PropTypes from 'proptypes'

import ROW from '../../constants/row'
import RowInput from './rowInput'
import RowDestroyBtn from './rowDestroyBtn'
import RowSwitchBtn from './rowSwitchBtn'

const RowBullet = (props) => (
  <div className='row bullet'>
    <span className='bullet'>•</span>
    <RowInput model={props.model} />
    <RowSwitchBtn model={props.model} next={ROW.HEADING} />
    <RowDestroyBtn model={props.model} />
  </div>
)

export default RowBullet
