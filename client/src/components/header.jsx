import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import './header.css'

const pages = [
  {
    path: '/clients',
    name: 'Clients',
    icon: 'group'
  },
  {
    path: '/invoices',
    name: 'Invoices',
    icon: 'notes'
  },
  {
    path: '/editor',
    name: 'Editor',
    icon: 'pen'
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: 'settings'
  }
]

const Header = () => {
  const links = pages.map((page) => (
    <Link
      key={page.path}
      to={page.path}
      className={classNames('header-item')}
    >
      <span className={classNames('glyphicons', page.icon)} >
        {page.name}
      </span>
    </Link>
  ))

  return (
    <header className='header'>
      <h1 className='logo'>
        Invoiced
        <span className='glyphicons shopping_cart' />
      </h1>
      <nav>{links}</nav>
    </header>
  )
}

export default Header
