import React from 'react'

import AppActions from '../../actions/app'
import SnippetModel from '../../models/snippet'

class SnippetItem extends React.Component {
  static propTypes = {
    model: PropTypes.instanceOf(SnippetModel).isRequired
  }

  componentDidMount () {
    this.props.model.on('change', this._onChange, this)
  }

  componentWillUnmount () {
    this.props.model.off('change', this._onChange, this)
  }

  render () {
    return (
      <div className='snippet-item'>
        <div className='shortcut'>{this.props.model.get('shortcut')}</div>
        <div className='content'>{this.props.model.get('content')}</div>
        <button type='button' onClick={this.destroy}>
          <span className='halflings remove '/>
        </button>
      </div>
    )
  }

  edit () {
    AppActions.editSnippet(this.props.model)
  }

  destroy () {
    AppActions.destroySnippet(this.props.model)
  }

  _onChange () {
    this.forceUpdate()
  }
}

export default SnippetItem
