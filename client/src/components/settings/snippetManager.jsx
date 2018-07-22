import React from 'react'

import SnippetList from './snippetList'

const SnippetManager = () => (
  <div className='snippet-manager'>
    <header>
      <h1>Snippets</h1>
      <button className='primary' type='button' onClick={this.create}>
        <span className='halflings plus-sign'>New Snippet</span>
      </button>
    </header>
    <SnippetList />
  </div>
)

export default SnippetManager
