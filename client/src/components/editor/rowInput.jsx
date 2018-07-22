import React from 'react'

const RowInput = (props) => {
  const { row } = props
  return (
    <input
      ref='input'
      type={this.props.type}
      onChange={this.handleChange}
      onKeyDown={this.handleKeyDown}
      value={row.content}
    />
  )
}

/*
const handleChange = () => {
  var val = this.refs.input.getDOMNode().value
  this.props.model.set('content', val)
}

const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    var val = this.refs.input.getDOMNode().value
    var snippet = false // SnippetStore.expand(val)
    if (snippet) {
      const content = snippet.get('content')
      this.props.model.set('content', content)
    }
  }
}
*/

export default RowInput
