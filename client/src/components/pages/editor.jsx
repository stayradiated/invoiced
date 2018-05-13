import React from 'react'

import Header from '../editor/header'
import Details from '../editor/details'
import Rows from '../editor/rows'
import InvoiceStore from '../../stores/invoice'

import './editor.css'

const getState = () => ({
  model: InvoiceStore.get('editing')
})

class EditorPage extends React.Component {

  constructor () {
    super()
    this.state = getState()
  }

  componentDidMount () {
    InvoiceStore.on('change:editing', this._onChange, this)
  }

  componentWillUnmount () {
    InvoiceStore.off('change:editing', this._onChange, this)
  }

  render () {
    if (! this.state.model) {
      return <p>No invoice selected</p>
    }

    return (
      <div className='EditorPage-container'>
        <Details model={this.state.model} />
        <div className='EditorPage-editor'>
          <Header model={this.state.model} />
          <Rows collection={this.state.model.get('rows')} />
        </div>
      </div>
    )
  }

  _onChange () {
    this.setState(getState())
  }
}

export default EditorPage
