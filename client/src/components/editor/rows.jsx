import React from 'react'
import PropTypes from 'proptypes'

import RowDate from './rowDate'
import RowBullet from './rowBullet'
import RowNumber from './rowItem'
import RowHeading from './rowHeading'

import ROW from '../../constants/row'

const Rows = (props) => {
  const { rows } = props
  var i = 1

  var rowItems = rows.map(function (row) {
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
    <div className='rows'>{rowItems}</div>
  )
}

export default Rows
