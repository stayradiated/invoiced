import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Store } from 'repatch'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Header from './header'
// import Modal from './modal'
import ClientsPage from './pages/clients'
import EditorPage from './pages/editor'
import SettingsPage from './pages/settings'

import './app.css'

const client = new ApolloClient({
  uri: '/api',
})

const store = new Store({})

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider store={store} client={client}>
        <div className='app'>
          <Header />
          {/* <Modal /> */}
          <div className='page-container'>
            <Switch>
              <Route path='/clients' component={ClientsPage} />
              <Route path='/editor/:invoiceId' component={EditorPage} />
              <Route path='/settings' component={SettingsPage} />
              <Redirect exact from='/' to='/clients' />
            </Switch>
          </div>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  )
}

export default App
