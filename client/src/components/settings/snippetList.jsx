import React from 'react'
import PropTypes from 'proptypes'

import SnippetStore from '../../stores/snippet'
import SnippetItem from './snippetEditItem'
import SnippetCollection from '../../models/snippets'

const getState = () => ({
  edit: SnippetStore.get('edit')
})

class SnippetList extends React.Component {

  static propTypes = {
    collection: PropTypes.instanceOf(SnippetCollection).isRequired
  }

  constructor () {
    super()
    this.state = getState()
  }

  componentDidMount () {
    SnippetStore.on('change:edit', this._onChange, this)
    this.props.collection.on('add remove', this._onChange, this)
  }

  componentWillUnmount () {
    SnippetStore.off('change:edit', this._onChange, this)
    this.props.collection.off('add remove', this._onChange, this)
  }

  render () {
    return (
      <div className='snippet-list'>{
        this.props.collection.map(function (snippet) {
          return <SnippetItem key={snippet.cid} model={snippet} />
        }, this)
      }</div>
    )
  }

  _onChange () {
    this.setState(getState())
  }
}

export default SnippetList
