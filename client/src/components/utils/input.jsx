import React from 'react'
import PropTypes from 'proptypes'
import moment from 'moment'

class Input extends React.Component {
  static propTypes = {
    model: PropTypes.object,
    key: PropTypes.string,
    type: PropTypes.string
  }

  static defaultProps = {
    type: 'text'
  }

  constructor (props) {
    super()
    this.state = {
      value: props.model.get(props.key)
    }
  }

  componentDidMount () {
    this.props.model.on('change:' + this.props.key, this._onChange, this)
  }

  componentWillUnmount () {
    this.props.model.off('change:' + this.props.key, this._onChange, this)
  }

  render () {
    let value = this.state.value
    const type = this.props.type

    switch (type) {
      case 'date':
        value = moment(value).format('YYYY-MM-DD')
        break
    }

    return (
      <input
        ref='input'
        type={type}
        value={value}
        onBlur={this.save}
        onChange={this.handleChange}
      />
    )
  }

  save () {
    this.props.model.set(this.props.key, this.state.value)
    if (this.props.model.hasChanged()) {
      this.props.model.save()
    }
  }

  handleChange (event) {
    this.setState({
      value: event.target.value
    })
  }

  _onChange () {
    this.setState({
      value: this.props.model.get(this.props.key)
    })
  }
}

export default Input
