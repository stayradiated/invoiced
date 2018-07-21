import React from 'react'
import PropTypes from 'proptypes'

import RowInput from './rowInput'
import RowDestroyBtn from './rowDestroyBtn'

const RowDate = (props) => (
  <div className='row date'>
    <span>Job Date:</span>
    <RowInput model={this.props.model} type='date' />
    <div className='fill'></div>
    <RowDestroyBtn model={this.props.model} />
  </div>
)

export default RowDate
