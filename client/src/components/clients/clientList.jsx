import React from 'react'
import PropTypes from 'proptypes'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

import ClientItem from './clientItem'
import AppActions from '../../actions/app'

import SearchBox from '../utils/searchBox'

import './clientList.css'

const QUERY = gql`
  query fetchAllClients {
    clients {
      total
      items {
        id
        name
        address
        city
        postcode
        invoices {
          total
        }
      }
    }
  }
`

const ClientList = (props) => (
  <Query query={QUERY}>
    {({data, loading}) => {
      if (loading) {
        return 'loading...'
      }

      const clientItems = data.clients.items.map((client) => (
        <ClientItem key={client.id} client={client} />
      ))

      return (
        <div className='ClientList-container'>
          <SearchBox 
            className='ClientList-searchbox'
            onChange={this.handleSearch}
          />
          <div className='ClientList-list scrollable'>{clientItems}</div>
        </div>
      )
    }}
  </Query>
)

export default ClientList
