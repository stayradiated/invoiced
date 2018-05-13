import React from 'react'
import PropTypes from 'proptypes'

import RowModel from '../../models/row'
import SnippetStore from '../../stores/snippet'

class RowInput extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(RowModel).isRequired,
    type: PropTypes.string
  }

  componentDidMount () {
    this.props.model.on('change:content', this._onChange, this)
  }

  componentWillUnmount () {
    this.props.model.off('change:content', this._onChange, this)
  }

  getDefaultProps () {
    return {
      type: 'text'
    }
  }

  render () {
    return (
      <input
        ref='input'
        type={this.props.type}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        value={this.props.model.get('content')}
      />
    )
  }

  handleChange () {
    var val = this.refs.input.getDOMNode().value
    this.props.model.set('content', val)
  }

  handleKeyDown (e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      var val = this.refs.input.getDOMNode().value
      var snippet = SnippetStore.expand(val)
      if (snippet) {
        const content = snippet.get('content')
        this.props.model.set('content', content)
      }
    }
  }

  _onChange () {
    this.forceUpdate()
  }
}

export default RowInput
