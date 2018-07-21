import React from 'react'
import PropTypes from 'proptypes'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

import './clientDetails.css'

const QUERY = gql`
  query fetchClientDetails ($clientId: ID!) {
    client(id: $clientId) {
      id
      name
      address
      city
      postcode
    }
  }
`

const ClientDetails = (props) => {
  const { client } = props
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
          onClick={this.handleCreate}>
          <span className='halflings plus-sign'>New Invoice</span>
        </button>
      </div>
    </header>
  )
}

const withClient = (Component) => (props) => (
  <Query query={QUERY} variables={props}>
    {({ data, loading }) => {
      if (loading) {
        return 'loading...'
      }
      return <Component client={data.client} />
    }}
  </Query>
)

export default withClient(ClientDetails)
