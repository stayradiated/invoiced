import React from 'react'

import ClientList from './clientList'
import AppActions from '../../actions/app'
import ClientStore from '../../stores/client'

import './clientSection.css'

class ClientSection extends React.Component {
  render () {
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
              onClick={this.create}
            >
              <span className='halflings plus-sign'>New Client</span>
            </button>
          </div>
        </header>
        <ClientList
          collection={ClientStore.get('collection')}
        />
      </section>
    )
  }

  create () {
    AppActions.createClient()
  }
}

export default ClientSection
