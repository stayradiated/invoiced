import React from 'react'

import ROW from '../../constants/row'

const createRow = () => null

const Header = (props) => (
  <header>
    <ul className='rows'>
      <li onClick={createRow.bind(this, ROW.ITEM)}>Item</li>
      <li onClick={createRow.bind(this, ROW.BULLET)}>Bullet</li>
      <li onClick={createRow.bind(this, ROW.HEADING)}>Heading</li>
      <li onClick={createRow.bind(this, ROW.DATE)}>Date</li>
    </ul>
    <ul className='invoice'>
      <li onClick={this.revert}>
        <span className='halflings repeat' />
        Revert
      </li>
      <li onClick={this.save}>
        <span className='halflings floppy_disk' />
        Save
      </li>
      <li>Templates</li>
      <li onClick={this.export}>
        <span className='halflings print' />
        Export
      </li>
    </ul>
  </header>
)

export default Header
