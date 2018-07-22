import React from 'react'
import PropTypes from 'proptypes'
import { Mutation, Query } from 'react-apollo'
import { compose, withHandlers } from 'recompose'

import {
  clientFragment,
  FETCH_SINGLE_CLIENT,
  CREATE_INVOICE
} from '../../queries'

import './clientDetails.css'

const handleCreateInvoice = (props) => () => {
  const { clientId, createInvoice } = props
  createInvoice({
    variables: {
      input: { client: clientId }
    },
    update: (cache, { data } ) => {
      const id = `Client:${clientId}`

      const prev = cache.readFragment({
        id,
        fragment: clientFragment
      })

      const next = {
        ...prev,
        invoices: {
          ...prev.invoices,
          items: [
            data.createInvoice,
            ...prev.invoices.items
          ]
        }
      }

      cache.writeFragment({
        id,
        fragment: clientFragment,
        data: next
      })
    }
  })
}

const ClientDetails = (props) => {
  const { client, onCreateInvoice } = props
  const { name, address, city, postcode } = client

  return (
    <header className='ClientDetails-container'>
      <div className='ClientDetails-details'>
        <h2 className='ClientDetails-title'>{name}</h2>
        <p className='ClientDetails-metadata'>
          <span>{address}</span>
          <span>{city}</span>
          <span>{postcode}</span>
        </p>
      </div>
      <div className='ClientDetails-buttons'>
        <button className='ClientDetails-button secondary' type='button' onClick={this.handleClick}>
          <span className='halflings pencil'>Edit Details</span>
        </button>
        <button className='ClientDetails-button primary' type='button'
          onClick={onCreateInvoice}>
          <span className='halflings plus-sign'>New Invoice</span>
        </button>
      </div>
    </header>
  )
}

ClientDetails.propTypes = {
  client: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    postcode: PropTypes.string
  }),
  onCreateInvoice: PropTypes.func.isRequired
}

const withClient = (Component) => (props) => (
  <Query query={FETCH_SINGLE_CLIENT} variables={props}>
    {({ data, loading }) => {
      if (loading) {
        return 'loading...'
      }
      return <Component {...props} client={data.client} />
    }}
  </Query>
)

const withCreateInvoice = (Component) => (props) => (
  <Mutation mutation={CREATE_INVOICE}>
    {(createInvoice) => (
      <Component {...props} createInvoice={createInvoice} />
    )}
  </Mutation>
)

export default compose(
  withClient,
  withCreateInvoice,
  withHandlers({
    onCreateInvoice: handleCreateInvoice
  })
)(ClientDetails)
