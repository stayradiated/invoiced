require('date-utils');

var Template = require('../libs/template');
var Promise = require('bluebird');

var Search = Backbone.Marionette.ItemView.extend({

  template: {
    client: new Template('search.client'),
    invoice: new Template('search.invoice')
  },

  ui: {
    input: 'input.search-box',
    clients: '.clients ul',
    invoices: '.invoices ul'
  },

  events: {
    'click .clients li':        'selectClient',
    'click .invoices li':       'selectInvoice',
    'click .invoices .new':     'createInvoice',
    'click .clients .delete':   'toggleDeleteMode',
    'keyup input.search-box':   'queryChange',
    'change input.search-box':  'queryChange',
  },

  initialize: function () {
    this.queryChange = _.debounce(this.search, 250);

    this.temp = {
      clients: {},
      invoices: {}
    };

    this.active = {
      client: null,
      invoice: null,
      el: {
        client: null,
        invoice: null
      }
    };

    this.shown = true;
    this.fadeout = 500;
  },

  hide: function() {
    this.shown = false;
    this.el.css({
      opacity: 0
    });
    Promise.delay(this.fadeout).then((function(_this) {
      return function() {
        return _this.el.css('display', 'none');
      };
    })(this));
    return false;
  },

  show: function() {
    this.shown = true;
    this.el.css('display', 'block');
    Promise.delay(1).then((function(_this) {
      return function() {
        return _this.el.css('opacity', '1');
      };
    })(this));
    return true;
  },

  renderClients: function(clients) {
    return this.ui.clients.html(this.template.client.render({
      clients: clients
    }));
  },

  renderInvoices: function(invoices) {
    return this.ui.invoices.html(this.template.invoice.render({
      invoices: invoices
    }));
  },

  refresh: function() {
    this.ui.input.val('');
    return this.search();
  },

  search: function() {
    var query;
    query = this.ui.input.val();
    return storage.searchClients(query).then((function(_this) {
      return function(clients) {
        var client, requests;
        requests = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = clients.length; _i < _len; _i++) {
            client = clients[_i];
            _results.push(storage.getClientInvoiceCount(client.id));
          }
          return _results;
        })();
        return Promise.all(requests).then(function(results) {
          var i, _i, _len;
          _this.temp.clients = {};
          for (i = _i = 0, _len = clients.length; _i < _len; i = ++_i) {
            client = clients[i];
            client.count = results[i];
            _this.temp.clients[client.id] = client;
          }
          return _this.renderClients(clients);
        });
      };
    })(this));
  },

  toggleDeleteMode: function() {
    this.deleteClientMode = !this.deleteClientMode;
    return this.el.toggleClass('delete-mode', this.deleteClientMode);
  },

  selectClient: function(e) {
    var $el, clientId, _ref;
    $el = $(e.currentTarget);
    clientId = $el.data('id');
    if (this.deleteClientMode) {
      if (this.temp.clients[clientId].count > 0) {
        return window.alert('Sorry, you must delete all the clients invoices first');
      }
      if (window.confirm('Are you sure you want to delete that client?')) {
        $el.remove();
        storage.deleteClient(clientId);
      }
      return;
    }
    if ((_ref = this.active.el.client) != null) {
      _ref.removeClass('active');
    }
    this.active.el.client = $el.addClass('active');
    this.active.client = this.temp.clients[clientId];
    return storage.getClientInvoices(clientId).then((function(_this) {
      return function(invoices) {
        var invoice, _i, _len;
        _this.temp.invoices = {};
        for (_i = 0, _len = invoices.length; _i < _len; _i++) {
          invoice = invoices[_i];
          _this.temp.invoices[invoice.id] = invoice;
        }
        return _this.renderInvoices(invoices);
      };
    })(this));
  },

  selectInvoice: function(e) {
    var $el, invoiceId, _ref;
    $el = $(e.currentTarget);
    invoiceId = $el.data('id');
    if (this.deleteClientMode) {
      if (window.confirm('Are you sure you want to delete that invoice?')) {
        $el.remove();
        storage.deleteInvoice(invoiceId);
        this.temp.clients[this.temp.invoices[invoiceId].clientId].count -= 1;
      }
      return;
    }
    if ((_ref = this.active.el.invoice) != null) {
      _ref.removeClass('active');
    }
    this.active.el.invoice = $el.addClass('active');
    this.active.invoice = this.temp.invoices[invoiceId];
    if (this.active.invoice.date instanceof Date) {
      this.active.invoice.date = this.active.invoice.date.toYMD();
    } else {
      console.log(this.active.invoice.date);
    }
    return storage.getRows(invoiceId).then((function(_this) {
      return function(rows) {
        _this.trigger('select:invoice', _this.active.client, _this.active.invoice, rows);
        return _this.hide();
      };
    })(this));
  },

  createInvoice: function() {
    this.trigger('create:invoice', this.active.client);
    return this.hide();
  }

});

module.exports = Search;
