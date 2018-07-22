import React from 'react'

import Input from '../utils/input'

const SnippetEditItem = (props) => {
  const { snippet } = props

  return (
    <div className='snippet-item edit'>
      <div className='shortcut'>
        <Input
          model={snippet}
          field='shortcut'
        />
      </div>
      <div className='content'>
        <Input
          model={snippet}
          field='content'
        />
      </div>
      <button type='button' onClick={this.destroy}>
        <span className='halflings remove '/>
      </button>
    </div>
  )
}

export default SnippetEditItem
