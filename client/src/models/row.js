import Backbone from 'backbone'

const Row = Backbone.RelationalModel.extend({
  urlRoot: '/rows',
  defaults: { 
    invoice: null,
    order: 0,
    content: ''
  }
})

export default Row
