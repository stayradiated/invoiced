import React from 'react'

import AppActions from '../../actions/app'
import SnippetStore from '../../stores/snippet'
import SnippetList from './snippetList'

class SnippetManager extends React.Component {
  render () {
    return (
      <div className='snippet-manager'>
        <header>
          <h1>Snippets</h1>
          <button className='primary' type='button' onClick={this.create}>
            <span className='halflings plus-sign'>New Snippet</span>
          </button>
        </header>
        <SnippetList collection={SnippetStore.get('collection')} />
      </div>
    )
  }

  create () {
    console.log('creating snippet')
    AppActions.createSnippet()
  }
}

export default SnippetManager
