
Base = require '../libs/base'

class Search extends Base.Controller

  template: new Base.View('search.result')

  elements:
    'input': 'input'
    '.results': 'results'

  events:
    'keyup input': 'search'
    'click li': 'select'

  constructor: ->
    super

  render: (invoices) =>
    @results.empty()
    for invoice in invoices
      @results.append @template.render(invoice)

  search: (e) =>
    query = @input.val()
    @storage.searchClients query, (err, results) =>
      @render(results)

  select: (e) =>
    console.log e.target

module.exports = Search
