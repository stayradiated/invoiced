import React from 'react'
import PropTypes from 'proptypes'
import classNames from 'classnames'

import './searchBox.css'

class SearchBox extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func
  }

  constructor () {
    super()
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  render () {
    const { className } = this.props

    return (
      <div className={classNames('SearchBox-container', className)}>
        <span className='halflings search' />
        <input 
          className='SearchBox-input'
          onChange={this.handleChange}
          value={this.state.value}
          placeholder='Search...'
        />
      </div>
    )
  }

  handleChange (event) {
    var value = event.target.value
    this.setState({
      value: value
    })
    this.props.onChange && this.props.onChange(value)
  }
}

export default SearchBox
