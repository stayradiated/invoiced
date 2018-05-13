import React from 'react'

import Header from './header'
import Modal from './modal'
import ClientsPage from './pages/clients'
import EditorPage from './pages/editor'
import SettingsPage from './pages/settings'
import AppStore from '../stores/app'
import AppConstants from '../constants/app'
import ClientStore from '../stores/client'
import InvoiceStore from '../stores/invoice'

import './app.css'

const getState = () => ({
  activePage: AppStore.get('activePage')
})

class App extends React.Component {
  constructor () {
    super()
    this.state = getState()
  }

  componentDidMount () {
    AppStore.on('change:activePage', this._onChange, this)
    ClientStore.get('collection').once('reset', this._onChange, this)
    InvoiceStore.get('collection').once('reset', this._onChange, this)
  }

  render () {
    var page

    switch (this.state.activePage) {
      case AppConstants.CLIENT_PAGE:
        page = <ClientsPage />
        break
      case AppConstants.EDITOR_PAGE:
        page = <EditorPage />
        break
      case AppConstants.SETTINGS_PAGE:
        page = <SettingsPage />
        break
      default:
        page = null
        break
    }

    return (
      <div className='app'>
        <Header />
        <Modal />
        <div className='page-container'>
          {page}
        </div>
      </div>
    )
  }

  _onChange () {
    this.setState(getState())
  }
}

export default App
