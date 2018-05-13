import _ from 'lodash'
import React from 'react'
import PropTypes from 'proptypes'

import ClientItem from './clientItem'
import ClientStore from '../../stores/client'
import AppActions from '../../actions/app'
import ClientCollection from '../../models/clients'
import SearchBox from '../utils/searchBox'

import './clientList.css'

class ClientList extends React.Component {
  static propTypes = {
    collection: PropTypes.instanceOf(ClientCollection).isRequired
  }

  constructor () {
    super()
    this.state = {
      active: ClientStore.get('active'),
      filter: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount () {
    ClientStore.on('change:active', this._onChange, this)
    this.props.collection.on('add remove', this._onChange, this)
    this.props.collection.on('add', this.openClient, this)
  }

  componentWillUnmount () {
    ClientStore.off('change:active', this._onChange, this)
    this.props.collection.off('add remove', this._onChange, this)
    this.props.collection.off('add', this.openClient, this)
  }

  render () {
    var clients = this.props.collection.map(function (client) {
      if (client.matchFilter(this.state.filter)) {
        return <ClientItem key={client.cid} model={client} />
      }
      return null
    }, this)

    clients = _.reject(clients, _.isUndefined)

    return (
      <div className='ClientList-container'>
        <SearchBox 
          className='ClientList-searchbox'
          collection={ClientStore.get('collection')}
          onChange={this.handleSearch}
        />
        <div className='ClientList-list scrollable'>{clients}</div>
      </div>
    )
  }

  handleSearch (filter) {
    this.setState({
      filter: filter
    })
  }

  openClient (client) {
    AppActions.openClient(client)
  }

  _onChange () {
    this.setState({
      active: ClientStore.get('collection')
    })
  }
}

export default ClientList
