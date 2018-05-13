import React from 'react'
import PropTypes from 'proptypes'

import RowCollection from '../../models/rows'

class InvoiceRows extends React.Component {
  static propTypes = {
    collection: PropTypes.instanceOf(RowCollection).isRequired
  }

  render () {
    return (
      null
    )
  }
}

export default InvoiceRows
