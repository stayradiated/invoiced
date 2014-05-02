'use strict';

var _ = require('underscore');
var rest = require('./rest');

var Route = function (options) {
  this.collection = options.collection.forge();
  this.columns = options.columns;
  this.root = '/' + options.collection.prototype.model.prototype.tableName;

  // pull data from sql
  this.collection.fetch();

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
    rest.end(res, this.collection);
  },

  create: function (req, res) {
    var json = _.pick(req.body, this.columns);

    this.collection.create(json)
    .then(rest(res))
    .catch(rest.catch(res));
  },

  read: function (req, res) {
    var model = this.collection.get(req.params.id);
    if (! model) rest.fail(res);
    rest.end(res, model);
  },

  update: function (req, res) {
    var model = this.collection.get(req.params.id);
    if (! model) return rest.fail(res);
    var json = _.pick(req.body, this.columns);

    model.save(json)
    .then(rest(res))
    .catch(rest.catch(res));
  },

  destroy: function (req, res) {
    var model = this.collection.get(req.params.id);
    if (! model) rest.fail(res);
    model.destroy()
    .then(function () { res.end(); })
    .catch(rest.catch(res));
  },

  addRelation: function (table) {
    var fn = function (req, res) {
      this.collection.get(req.params.id).related(table).fetch()
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
