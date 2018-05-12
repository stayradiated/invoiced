/* @flow */

/*::
import type { $Response } from 'express'
*/

const rest = {
  end (res /*: $Response */, data /*: Object */) {
    const json = data.hasOwnProperty('toJSON')
      ? data.toJSON({ shallow: true }) : data
    res.header({ 'Content-Type': 'application/json' })
    res.end(JSON.stringify(json))
  },

  fail (res /*: $Response */, err /*: Object */) {
    const message = err && err.message ? err.message : err
    res.status(500)
    res.end(message)
  }
}

module.exports = rest
