import React from 'react'

const withModel = (getModel, event = 'change', getState) => (Component) => class Model extends React.Component {
  constructor (props) {
    super()
    this.model = getModel(props) 
    this.state = getState(this.model, props)
  }

  componentDidMount () {
    this.model.on(event, this.handleChange, this)
  }

  componentWillUnmount () {
    this.model.on(event, this.handleChange, this)
  }

  render () {
    return (
      <Component
        {...this.props}
        {...this.state}
      />
    )
  }

  handleChange () {
    console.log('Calculating state', this.model, this.props)
    this.setState(getState(this.model, this.props))
  }
}

export default withModel
