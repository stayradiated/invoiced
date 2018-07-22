import React from 'react'
import { Mutation } from 'react-apollo'
import { compose, withHandlers } from 'recompose'

import ClientList from './clientList'

import {
  FETCH_ALL_CLIENTS,
  CREATE_CLIENT
} from '../../queries'

import './clientSection.css'

const handleCreateClient = (props) => (input) => {
  const { createClient } = props
  return createClient({
    variables: {
      input: {
        name: '',
        address: '',
        city: '',
        postcode: ''
      }
    },
    update: (cache, { data} ) => {
      const { clients } = cache.readQuery({
        query: FETCH_ALL_CLIENTS,
        variables: { first: 30, skip: 0 }
      })
      cache.writeQuery({
        query: FETCH_ALL_CLIENTS,
        variables: { first: 30, skip: 0 },
        data: {
          clients: {
            ...clients,
            items: [
              data.createClient,
              ...clients.items
            ]
          }
        }
      })
    }
  })
}

const ClientSection = (props) => {
  const { onCreateClient } = props

  return (
    <section className='ClientSection-container'>
      <header className='ClientSection-header'>
        <h2 className='ClientSection-title'>
          Clients
        </h2>
        <div className='ClientSection-buttons'>
          <button
            className='ClientSection-button'
            type='button'
            onClick={onCreateClient}
          >
            <span className='halflings plus-sign'>New Client</span>
          </button>
        </div>
      </header>
      <ClientList />
    </section>
  )
}

const withCreateClient = (Component) => (props) => (
  <Mutation mutation={CREATE_CLIENT}>
    {(createClient) => (
      <Component {...props} createClient={createClient} />
    )}
  </Mutation>
)

export default compose(
  withCreateClient,
  withHandlers({
    onCreateClient: handleCreateClient
  })
)(ClientSection)
