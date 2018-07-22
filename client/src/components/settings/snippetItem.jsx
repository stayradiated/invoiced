import React from 'react'

const SnippetItem = (props) => {
  const { shortcut, content } = props

  return (
    <div className='snippet-item'>
      <div className='shortcut'>{shortcut}</div>
      <div className='content'>{content}</div>
      <button type='button' onClick={this.destroy}>
        <span className='halflings remove '/>
      </button>
    </div>
  )
}

export default SnippetItem
