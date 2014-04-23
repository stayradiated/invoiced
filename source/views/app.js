'use strict';

var fs = require('fs');
var swig = require('swig');
var Base = require('base');
var docx = require('../libs/docx');
var Storage = require('../libs/storage');
var Table = require('../views/table');
var Search = require('../views/search');
var Header = require('../views/header');
var Details = require('../views/details');
var Clients = require('../views/clients');
var Snippets = require('../views/snippets');
var CreateClient = require('../views/createClient');
var Records = require('../views/records');

var storage = global.storage = new Storage();

storage.on('error', function(err, message) {
  console.log('Showing error window');
  return console.log('Error message:', message);
});

var App = Base.View.extend({
  constructor: function () {
    this.storage = storage;
    storage.start();
    this.table = new Table({
      el: this.ui.table
    });
    this.details = new Details({
      el: this.ui.details
    });
    this.clientDetails = new Clients({
      el: this.ui.clientDetails
    });
    this.records = new Records({
      el: this.ui.records
    });
    this.setupSearch(this.ui.search);
    this.setupCreateClient(this.ui.createClient);
    this.setupSnippets(this.ui.snippets);
    this.setupHeader(this.ui.header);
    this.ui.search.search();
    this.ui.file.on('change', this.saveFile);
  },

  ui: {
    header: 'header',
    table: '.table',
    search: '.search',
    details: '.details',
    snippets: '.snippets',
    file: '#save-file',
    clientDetails: '.client-details',
    createClient: '.create-client',
    records: '.invoice-records'
  },

  events:  {
    'click .toggle-sidebar': 'toggleSnippets',
    'click .toggle-create-client': 'toggleCreateClient',
    'click .show-records': 'showRecords'
  },

  saveFile: function(e) {
    var extension, path;
    path = e.target.value;
    extension = '.docx';
    if (path.slice(-5) !== extension) {
      path += extension;
    }
    return this.buildDoc(path);
  },

  buildDoc: function(path) {
    return docx(path, {
      client: this.clientDetails.model["export"](),
      invoice: this.details.model["export"](),
      rows: this.table.model["export"]()
    });
  },

  setupSnippets: function(el) {
    var model;
    this.ui.snippets = new Snippets({
      el: el
    });
    model = this.ui.snippets.model;
    storage.getSnippets().then((function(_this) {
      return function(array) {
        return model.refresh(array, true);
      };
    })(this));
    model.on('before:destroy:model', storage.deleteSnippet);
    this.ui.snippets.on('save:snippet', storage.saveSnippet);
    return this.ui.snippets.on('load:snippet', (function(_this) {
      return function(snippet) {
        return _this.table.autoCreateRow(snippet.content);
      };
    })(this));
  },

  setupCreateClient: function(el) {
    this.ui.createClient = new CreateClient({
      el: el
    });
    this.ui.createClient.on('toggle', this.toggleCreateClient);
    return this.ui.createClient.on('refresh', this.ui.search.refresh);
  },

  toggleSnippets: function() {
    return this.el.toggleClass('no-snippets');
  },

  toggleCreateClient: function() {
    return this.el.toggleClass('no-create-client');
  },

  showRecords: function() {
    return this.records.show();
  },

  setupHeader: function(el) {
    this.ui.header = new Header({
      el: el,
      detect: {
        details: this.details.model,
        table: this.table.model
      }
    });
    this.ui.header.on('generate', (function(_this) {
      return function() {
        return _this.ui.file.click();
      };
    })(this));
    this.ui.header.on('open', (function(_this) {
      return function() {
        return _this.ui.search.show();
      };
    })(this));
    this.ui.header.on('create', this.createInvoice);
    return this.ui.header.on('save', (function(_this) {
      return function() {
        if (_this.details.model.unsaved) {
          return storage.invoiceExists(_this.details.model.id).then(function(results) {
            if (results[0].count > 0) {
              return window.alert('An invoice already exists with that ID, please choose another one');
            } else {
              return _this.saveInvoice();
            }
          });
        } else {
          return _this.saveInvoice();
        }
      };
    })(this));
  },

  setupSearch: function(el) {
    this.ui.search = new Search({
      el: el
    });
    this.ui.search.on('select:invoice', this.openInvoice);
    this.ui.search.on('create:client', this.ui.createClient);
    return this.ui.search.on('create:invoice', this.createInvoice);
  },

  createInvoice: function(client) {
    if (! client) {
      client = this.clientDetails.model;
    }
    this.details.model.refresh({
      clientId: client.id,
      customer: client.name,
      site: client.address
    }, true);
    this.details.model.unsaved = true;
    this.clientDetails.model.refresh(client, true);
    return this.table.model.refresh({}, true);
  },

  openInvoice: function(client, invoice, table) {
    var e;
    this.clientDetails.model.refresh(client, true);
    this.details.model.refresh(invoice, true);
    this.details.model.unsaved = false;
    try {
      return this.table.model.refresh(table, true);
    } catch (_error) {
      e = _error;
      return console.dir(e);
    }
  },

  saveInvoice: function() {
    storage.saveInvoice({
      invoice: this.details.model.toJSON(),
      rows: this.table.model.toJSON()
    });
    this.details.model.unsaved = false;
    return this.ui.header.resetStatus();
  }

});

module.exports = App;
