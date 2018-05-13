import React from 'react'
import classNames from 'classnames'

import AppStore from '../stores/app'
import AppActions from '../actions/app'

import './header.css'

const pages = {
  CLIENT_PAGE: {
    name: 'Clients',
    icon: 'group'
  },
  INVOICES: {
    name: 'Invoices',
    icon: 'notes'
  },
  EDITOR_PAGE: {
    name: 'Editor',
    icon: 'pen'
  },
  SETTINGS_PAGE: {
    name: 'Settings',
    icon: 'settings'
  }
}

const getState = () => ({
  activePage: AppStore.get('activePage')
})

class Header extends React.Component {
  constructor () {
    super()
    this.state = getState()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    AppStore.on('change:activePage', this._onChange, this)
  }

  componentWillUnmount () {
    AppStore.off('change:activePage', this._onChange, this)
  }

  render () {
    return (
      <header className='header'>
        <h1 className='logo'>
          Invoiced
          <span className='glyphicons shopping_cart' />
        </h1>
        <nav>{
          Object.keys(pages).map((id) => {
            const page = pages[id]
            return (
              <div
                key={id}
                className={classNames({
                  'header-item': true,
                  active: this.state.activePage === id,
                })}
                onClick={this.handleClick}
              >
                <span className={classNames('glyphicons', page.icon)} >
                  {page.name}
                </span>
              </div>
            )
          }, this)
        }</nav>
      </header>
    )
  }

  handleClick (page) {
    AppActions.openPage(page)
  }

  _onChange () {
    this.setState(getState())
  }
}

export default Header
