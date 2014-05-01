'use strict';

var _ = require('underscore');
var rest = require('./rest');

var Route = function (options) {
  this.model = options.model;
  this.collection = options.collection.forge();
  this.root = '/' + this.model.prototype.tableName;

  this.routes = [
    ['get',   this.root, 'all'],
    ['post', this.root, 'create'],
    ['get',   this.root + '/:id', 'read'],
    ['put',   this.root + '/:id', 'update'],
    ['patch', this.root + '/:id', 'update'],
    ['delete', this.root + '/:id', 'destroy']
  ];
};

_.extend(Route.prototype, {

  all: function (req, res) {
    this.collection.fetch()
    .then(rest(res))
    .catch(rest.catch(res));
  },

  create: function (req, res) {
    this.model.forge(req.body).save()
    .then(rest(res))
    .catch(rest.catch(res));
  },

  read: function (req, res) {
    this.model.forge({ id: req.params.id }).fetch()
    .then(rest(res))
    .catch(rest.catch(res));
  },

  update: function (req, res) {
    this.model.forge({ id: req.params.id }).save(req.body)
    .then(rest(res))
    .catch(rest.catch(res));
  },

  destroy: function (req, res) {
    this.model.forge({ id: req.params.id }).destroy()
    .then(function () {
      res.end();
    })
    .catch(rest.catch(res));
  },

  addRelation: function (table) {
    var opts = { withRelated: [table] };
    var getTable = function (model) {
      return model.related(table);
    };

    var fn = function (req, res) {
      this.model.forge({ id: req.params.id }).fetch(opts)
      .then(getTable)
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
      app[method](path, fn.bind(this));
    }, this);
  }

});

module.exports = Route;
