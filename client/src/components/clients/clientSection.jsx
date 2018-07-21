import React from 'react'

import ClientList from './clientList'

import './clientSection.css'

const ClientSection = () => {
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
      <ClientList />
    </section>
  )
}

export default ClientSection
