'use strict';

var _ = require('underscore');
var query = require('./db');
var rest = require('./rest');

var Table = function (options) {
  this.table = options.table;
  this.columns = options.columns;
  this.orderBy = options.orderBy || 'id';
  this.orderByDirection = options.orderByDirection || 'asc';
  this.root = options.root || '/' + this.table;
  this.timestamps = options.timestamps || false;

  this.routes = [
    ['get',   this.root, 'all'],
    ['get',   this.root + '/:id', 'read'],
    ['put',   this.root + '/:id', 'update'],
    ['patch', this.root + '/:id', 'update']
  ];
};

_.extend(Table.prototype, {

  all: function (req, res) {
    query(this.table).select()
    .orderBy(this.orderBy, this.orderByDirection)
    .then(rest(res))
    .catch(rest.catch(res));
  },

  read: function (req, res) {
    query(this.table).select()
    .where({ id: req.params.id })
    .orderBy(this.orderBy, this.orderByDirection)
    .then(function (rows) {
      return rows[0];
    })
    .then(rest(res))
    .catch(rest.catch(res));
  },

  update: function (req, res) {
    var json = _.pick(req.body, this.columns);
    var id = req.params.id;

    if (this.timestamps) {
      json.dateUpdated = new Date();
    }

    query(this.table).update(json)
    .where({ id: id })
    .then(function () {
      res.end();
    })
    .catch(rest.catch(res));
  },

  join: function (table, column, key) {

    var fn = function (req, res) {
      var options = {};
      options[column] = req.params[key];

      query(table).select()
      .where(options)
      .then(rest(res))
      .catch(rest.catch(res));
    };

    this.routes.push(['get', this.root + '/:id/' + table, fn]);
  },

  listen: function (app) {
    _.each(this.routes, function (route) {
      var fn = route[2];
      var path = route[1];
      var method = route[0];
      if (_.isString(fn)) fn = this[fn];
      console.log(method, path);
      app[method](path, fn.bind(this));
    }, this);
  }

});

module.exports = Table;