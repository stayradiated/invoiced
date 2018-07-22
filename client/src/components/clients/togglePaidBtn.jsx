import React from 'react'

const TogglePaidBtn = (props) => {
  const { invoice } = props
  const { paid } = invoice

  const classes = paid ? 'subtle' : 'primary'

  return (
    <button className={classes} type='button' onClick={this.handleToggle}>{
      paid ? (
        <span className='halflings ok'>Paid</span>
      ) : (
        <span className='halflings remove'>Unpaid</span>
      )
    }</button>
  )
}

export default TogglePaidBtn
