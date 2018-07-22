import classNames from 'classnames'
import { Link } from 'react-router-dom'

import React from 'react'

import './clientItem.css'

const ClientItem = (props) => {
  const { isActive, client } = props
  const { id, name, address, city, postcode, invoices }= client

  const classes = classNames({
    'ClientItem-container': true,
    'active': isActive
  })

  return (
    <Link key={id} to={`/clients/${id}`} className={classes}>
      <div className='ClientItem-details'>
        <h3 className='ClientItem-title'>{name}</h3>
        <p className='ClientItem-metadata'>
          <span className='ClientItem-address'>{address}</span>
          <span className='ClientItem-city'>{city}</span>
          <span className='ClientItem-postcode'>{postcode}</span>
        </p>
      </div>
      <div className='ClientItem-count number'>{invoices.total}</div>
    </Link>
  )
}

export default ClientItem
