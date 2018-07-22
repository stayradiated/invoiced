import React from 'react'

import DetailsInput from './detailsInput'

import './details.css'

const Details = (props) => {
  const { invoice } = props

  return (
    <div className='details'>
      <h3>Invoice</h3>

      <DetailsInput
        invoice={invoice}
        label='Invoice ID'
        field='number'
        type='text'
      />

      <DetailsInput
        invoice={invoice}
        label='Created At'
        field='date'
        type='date'
      />

      <h3>Customer</h3>

      <DetailsInput
        invoice={invoice}
        label='Customer Name'
        field='customer'
      />

      <DetailsInput
        invoice={invoice}
        label='Site'
        field='site'
      />

      <DetailsInput
        invoice={invoice}
        label='Email'
        field='email'
        type='email'
      />

      <h3>Cost</h3>

      <DetailsInput
        invoice={invoice}
        label='Airmover Hire'
        field='airmover'
        type='text'
      />

      <DetailsInput
        invoice={invoice}
        label='Labour'
        field='labour'
        type='text'
      />

      <DetailsInput
        invoice={invoice}
        label='Total Cost'
        field='cost'
        type='text'
      />
    </div>
  )
}

export default Details
