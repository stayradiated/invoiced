import React from 'react'

import Input from '../utils/input'

const DetailsInput = (props) => {
  const { label, invoice, field, type } = props
  return (
    <div className='control'>
      <label>{label}</label>
      <Input
        model={invoice}
        field={field}
        type={type}
      />
    </div>
  )
}

export default DetailsInput
