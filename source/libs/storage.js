'use strict';

var Base = require('base');
var mysql = require('mysql');
var Promise = require('bluebird');

var Storage = function () {
  _.extend(this, Backbone.Events);

  this.db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'invoicer'
  });
};

_.extend(Storage.prototype, {

  start: function() {
    return this.db.connect((function(_this) {
      return function(err) {
        if (err) {
          return _this.trigger('error', err, 'Could not connect to database');
        } else {
          return _this.trigger('connected');
        }
      };
    })(this));
  },

  end: function() {
    return this.db.end();
  },

  escape: function(text) {
    return text.replace(/(['"!?\.])/, '\\$1');
  },

  _query: function() {
    var args = _.toArray(arguments);
    var deferred = Promise.defer();
    args.push(function(err, results) {
      if (err) {
        console.error(err);
        return deferred.reject(err);
      }
      return deferred.resolve(results);
    });
    var _ref;
    (_ref = this.db).query.apply(_ref, args);
    return deferred.promise;
  },

  saveInvoice: function(_arg) {
    var invoice = _arg.invoice;
    var rows = _arg.rows;
    invoice.dateUpdated = (new Date()).toFormat('YYYY-MM-DD HH24:MI:SS');
    console.log('Saving', invoice, rows);
    var query = {
      invoice: 'INSERT INTO invoices SET ? ON DUPLICATE KEY UPDATE ?',
      row: 'INSERT INTO rows SET ? ON DUPLICATE KEY UPDATE ?',
      empty: 'DELETE FROM rows WHERE invoiceId=?'
    };
    this._query(query.invoice, [invoice, invoice]);
    this._query(query.empty, invoice.id);
    var _results = [];
    for (var _i = 0, _len = rows.length; _i < _len; _i++) {
      var row = rows[_i];
      row.invoiceId = invoice.id;
      _results.push(this._query(query.row, [row, row]));
    }
    return _results;
  },

  invoiceExists: function(id) {
    return this._query('SELECT COUNT(id) as count FROM invoices WHERE id=?', id);
  },

  deleteInvoice: function(invoiceId) {
    this._query('DELETE FROM invoices WHERE id=?', invoiceId);
    return this._query('DELETE FROM rows WHERE id=?', invoiceId);
  },

  deleteClient: function(clientId) {
    return this._query('DELETE FROM clients WHERE id=?', clientId);
  },

  deleteSnippet: function(snippet) {
    return this._query('DELETE FROM snippets WHERE id=?', snippet.id);
  },

  saveSnippet: function(snippet) {
    return this._query('INSERT INTO snippets SET ?', snippet.toJSON());
  },

  getSnippets: function() {
    return this._query('SELECT * FROM snippets ORDER BY content');
  },

  getClients: function() {
    return this._query('SELECT * FROM clients');
  },

  searchClients: function(query) {
    console.log('searching for', query);
    query = this.escape(query);
    return this._query("SELECT * FROM clients WHERE\nname LIKE '%" + query + "%' OR\naddress LIKE '%" + query + "%' OR\ncity LIKE '%" + query + "%' OR\npostcode LIKE '%" + query + "%'\nORDER BY dateUpdated DESC");
  },

  getClient: function(id) {
    return this._query('SELECT * FROM clients WHERE id=?', id);
  },

  saveClient: function(client) {
    var sql;
    client.dateUpdated = (new Date()).toFormat('YYYY-MM-DD HH24:MI:SS');
    sql = 'INSERT INTO clients SET ? ON DUPLICATE KEY UPDATE ?';
    return this._query(sql, [client, client]);
  },

  getInvoices: function() {
    return this._query('SELECT * FROM invoices ORDER BY id DESC');
  },

  getClientInvoices: function(clientId) {
    return this._query("SELECT * FROM invoices\nWHERE clientId=?\nORDER BY dateUpdated DESC", clientId);
  },

  getClientInvoiceCount: function(clientId) {
    var deferred;
    deferred = Promise.defer();
    this._query('SELECT COUNT(id) FROM invoices WHERE clientId=?', clientId).then(function(results) {
      return deferred.resolve(results[0]['COUNT(id)']);
    });
    return deferred.promise;
  },

  getInvoice: function(id) {
    return this._query('SELECT * FROM invoices WHERE id=?', id);
  },

  getRows: function(invoiceId) {
    return this._query("SELECT * FROM rows WHERE invoiceId=?", invoiceId);
  },

});

module.exports = Storage;
