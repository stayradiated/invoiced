import React from 'react'
import PropTypes from 'proptypes'
import { Query } from 'react-apollo'

import ClientItem from './clientItem'
import SearchBox from '../utils/searchBox'

import { FETCH_ALL_CLIENTS } from '../../queries'

import './clientList.css'

const ClientList = (props) => {
  const { clientList } = props

  const clientItems = clientList.map((client) => (
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
}

ClientList.propTypes = {
  clientList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired
  })).isRequired
}

const withClientList = (Component) => () => (
  <Query
    query={FETCH_ALL_CLIENTS}
    variables={{first: 30, skip: 0}}
  >
    {({data, loading, fetchMore}) => {
      if (loading) {
        return 'loading...'
      }

      if (data.clients.items.length < data.clients.total) {
        fetchMore({
          variables: { skip: data.clients.items.length },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return prev
            }
            return {
              ...prev,
              clients: {
                ...prev.clients,
                items: [...prev.clients.items, ...fetchMoreResult.clients.items]
              }
            }
          }
        })
      }

      return <Component clientList={data.clients.items} />
    }}
  </Query>
)

export default withClientList(ClientList)
