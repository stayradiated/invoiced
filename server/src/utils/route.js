/* @flow */

const pick = require('object.pick')

const rest = require('./rest')

/*::
import type { $Request, $Response } from 'express'

type $App = Object
type $Collection = Object
type $Columns = Array<string>

type $Handler = ($Request, $Response) => Promise<void>
type $Route = [ string, string, $Handler ]
type $RouteList = Array<$Route>

type $constructorOptions = {
  collection: $Collection,
  columns: $Columns
}
*/

class Route {
  /*::
  collection: $Collection
  columns: $Columns
  root: string
  routes: $RouteList
  */

  constructor (options /*: $constructorOptions */) {
    this.collection = options.collection.forge()
    this.columns = options.columns
    this.root = '/' + options.collection.prototype.model.prototype.tableName

    // pull data from sql
    this.collection.fetch()

    this.routes = [
      ['get', this.root, this.all],
      ['post', this.root, this.create],
      ['get', this.root + '/:id', this.read],
      ['put', this.root + '/:id', this.update],
      ['patch', this.root + '/:id', this.update],
      ['delete', this.root + '/:id', this.destroy]
    ]
  }

  async all (req /*: $Request */, res /*: $Response */) {
    rest.end(res, this.collection)
  }

  async create (req /*: $Request */, res /*: $Response */) {
    const json = pick(req.body, this.columns)

    if (json.hasOwnProperty('date')) {
      json.date = new Date(json.date).toISOString().split('T')[0]
    }

    try {
      const data = await this.collection.create(json)
      rest.end(res, data)
    } catch (err) {
      rest.fail(res, err)
    }
  }

  async read (req /*: $Request */, res /*: $Response */) {
    const model = this.collection.get(req.params.id)
    if (!model) {
      rest.fail(res, new Error('Could not find model'))
      return
    }
    rest.end(res, model)
  }

  async update (req /*: $Request */, res /*: $Response */) {
    const model = this.collection.get(req.params.id)
    if (!model) return this.create(req, res)

    const json = pick(req.body, this.columns)
    try {
      const data = await model.save(json)
      rest.end(res, data)
    } catch (err) {
      rest.fail(res, err)
    }
  }

  async destroy (req /*: $Request */, res /*: $Response */) {
    const model = this.collection.get(req.params.id)
    if (!model) {
      rest.fail(res, new Error('Could not find model'))
      return
    }

    this.collection.remove(model)
    try {
      await model.destroy()
      res.end()
    } catch (err) {
      rest.fail(res, err)
    }
  }

  addRelation (table /*: string */) {
    const handler = async (req, res) => {
      try {
        const data = await this.collection.get(req.params.id).related(table).fetch()
        rest.end(res, data)
      } catch (err) {
        rest.fail(res, err)
      }
    }

    this.routes.push(['get', this.root + '/:id/' + table, handler])
  }

  addRoute (method /*: string */, path /*: string */, fn /*: $Handler */) {
    this.routes.push([method, path, fn])
  }

  listen (app /*: $App */) {
    this.routes.forEach((route) => {
      const [ method, path, handler ] = route
      app[method](path, handler.bind(this))
    })
  }
}

module.exports = Route
