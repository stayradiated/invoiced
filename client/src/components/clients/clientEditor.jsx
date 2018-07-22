import React from 'react'
import PropTypes from 'proptypes'
import { compose } from 'recompose'
import { Mutation, Query } from 'react-apollo'
import { setPropTypes, withState, withHandlers } from 'recompose'

import {
  FETCH_ALL_CLIENTS,
  FETCH_SINGLE_CLIENT,
  UPDATE_CLIENT,
  DESTROY_CLIENT
} from '../../queries'

import './clientEditor.css'

const ClientEditor = (props) => {
  const { showEditor, state, onChangeField, onSave, onDestroy } = props
  const { name, address, city, postcode } = state

  if (showEditor === false) {
    return null
  }

  return (
    <div className='ClientEditor-container'>
      <div className='ClientEditor-row'>
        <label className='ClientEditor-label'>Name</label>
        <input
          className='ClientEditor-input'
          placeholder='Name'
          value={name}
          onChange={onChangeField('name')}
        />
      </div>
      <div className='ClientEditor-row'>
        <label className='ClientEditor-label'>Address</label>
        <input 
          className='ClientEditor-input'
          placeholder='Address'
          value={address}
          onChange={onChangeField('address')}
        />
      </div>
      <div className='ClientEditor-row'>
        <label className='ClientEditor-label'>City</label>
        <input
          className='ClientEditor-input'
          placeholder='City'
          value={city}
          onChange={onChangeField('city')}
        />
      </div>
      <div className='ClientEditor-row'>
        <label className='ClientEditor-label'>Post Code</label>
        <input 
          className='ClientEditor-input'
          placeholder='Post Code'
          value={postcode}
          onChange={onChangeField('postcode')}
        />
      </div>
      <div className='ClientEditor-buttons'>
        <button className='ClientEditor-button' onClick={this.handleHide}>
          <span className='halflings remove' />
          Cancel
        </button>
        <button className='ClientEditor-button primary' onClick={onSave}>
          <span className='halflings ok' />
          Save
        </button>
        <button className='ClientEditor-button text' onClick={onDestroy}>
          <span className='halflings trash' />
          Destroy
        </button>
      </div>
    </div>
  )
}

ClientEditor.propTypes = {
  showEditor: PropTypes.bool,
  state: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    postcode: PropTypes.string
  }),
  onChangeField: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired
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

const withUpdateClient = (Component) => (props) => (
  <Mutation mutation={UPDATE_CLIENT}>
    {(updateClient) => (
      <Component {...props} updateClient={updateClient} />
    )}
  </Mutation>
)

const withDestroyClient = (Component) => (props) => (
  <Mutation mutation={DESTROY_CLIENT}>
    {(destroyClient) => (
      <Component {...props} destroyClient={destroyClient} />
    )}
  </Mutation>
)

export default compose(
  setPropTypes({
    clientId: PropTypes.string.isRequired,
    onDestroy: PropTypes.func.isRequired
  }),
  withClient,
  withUpdateClient,
  withDestroyClient,
  withState('state', 'setState', (props) => props.client),
  withHandlers({
    onChangeField: (props) => (field) => (event) => {
      const { state, setState } = props
      setState({
        ...state,
        [field]: event.target.value
      })
    },
    onSave: (props) => () => {
      const { client, state, updateClient } = props
      const { name, address, city, postcode } = state
      updateClient({
        variables: {
          input: {
            id: client.id,
            name,
            address,
            city,
            postcode
          }
        }
      })
    },
    onDestroy: (props) => () => {
      const { client, destroyClient, onDestroy } = props

      onDestroy()

      destroyClient({
        variables: {
          input: {
            id: client.id
          }
        },
        update: (cache, data) => {
          const prev = cache.readQuery({
            query: FETCH_ALL_CLIENTS,
            variables: { first: 30, skip: 0 }
          })

          const next = {
            ...prev,
            clients: {
              ...prev.client,
              items: prev.clients.items.filter((item) => (
                item.id !== client.id))
            }
          }

          cache.writeQuery({
            query: FETCH_ALL_CLIENTS,
            variables: { first: 30, skip: 0 },
            data: next
          })
        }
      })
    }
  })
)(ClientEditor)
