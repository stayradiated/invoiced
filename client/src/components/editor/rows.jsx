import React from 'react'
import PropTypes from 'proptypes'

import RowDate from './rowDate'
import RowBullet from './rowBullet'
import RowNumber from './rowItem'
import RowHeading from './rowHeading'
import RowCollection from '../../models/rows'

import ROW from '../../constants/row'

class Rows extends React.Component {

  static propTypes = {
    collection: PropTypes.instanceOf(RowCollection).isRequired
  }

  componentDidMount () {
    this.props.collection.on('reset add remove change:type', this._onChange, this)
  }

  componentWillUnmount () {
    this.props.collection.off('reset add remove change:type', this._onChange, this)
  }

  render () {
    var i = 1

    var rows = this.props.collection.map(function (row) {
      var opts = {
        key: row.cid,
        model: row
      }

      switch (row.get('type')) {
        case ROW.DATE:
          return new RowDate(opts)
        case ROW.HEADING:
          return new RowHeading(opts)
        case ROW.BULLET:
          return new RowBullet(opts)
        case ROW.ITEM:
          opts.index = i++
          return new RowNumber(opts)
      }

      // default row type
      return new RowNumber(opts)
    })

    return (
      <div className='rows'>{rows}</div>
    )
  }

  _onChange () {
    this.forceUpdate()
  }
}

export default Rows
