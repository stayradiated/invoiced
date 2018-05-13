import _ from 'lodash'
import Backbone from 'backbone'

import Row from './row'

const Rows = Backbone.Collection.extend({
  model: Row,
  url: '/rows',
  comparator: 'order',

  initialize () {
    const memento = new Backbone.Memento(this)
    _.extend(this, memento)
    this.store()
  },

  save () {
    this.store()
    this.each(function (model) { model.save() })
  }
})

export default Rows
