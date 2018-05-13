import React from 'react'
import PropTypes from 'proptypes'

import Input from '../utils/input'
import AppActions from '../../actions/app'
import SnippetModel from '../../models/snippet'

class SnippetEditItem extends React.Component {
  static propTypes = {
    model: PropTypes.instanceOf(SnippetModel).isRequired
  }

  render () {
    return (
      <div className='snippet-item edit'>
        <div className='shortcut'>
          <Input
            model={this.props.model}
            key='shortcut'
          />
        </div>
        <div className='content'>
          <Input
            model={this.props.model}
            key='content'
          />
        </div>
        <button type='button' onClick={this.destroy}>
          <span className='halflings remove '/>
        </button>
      </div>
    )
  }

  destroy () {
    AppActions.destroySnippet(this.props.model)
  }
}

export default SnippetEditItem
