import React from 'react'

const withStore = (store, event = 'change', getState) => (Component) => class Store extends React.Component {
  constructor (props) {
    super()
    this.state = getState(store, props)
  }

  componentDidMount () {
    store.on(event, this.handleChange, this)
  }

  componentWillUnmount () {
    store.on(event, this.handleChange, this)
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
    this.setState(getState(store, this.props))
  }
}

export default withStore
