import React from 'react'

import Input from '../utils/input'

class DetailsInput extends React.Component {
  render () {
    return (
      <div className='control'>
        <label>{this.props.label}</label>
        <Input
          model={this.props.model}
          key={this.props.key}
          type={this.props.type}
        />
      </div>
    )
  }
}

export default DetailsInput
