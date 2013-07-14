// Generated by CoffeeScript 1.6.3
(function() {
  var Base, Details, Invoice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('base');

  Invoice = require('../models/invoice');

  Details = (function(_super) {
    __extends(Details, _super);

    Details.prototype.elements = {
      '.invoice-id': 'input-id',
      '.invoice-date': 'input-date',
      '.invoice-site': 'input-site',
      '.invoice-cost': 'input-cost',
      '.invoice-labour': 'input-labour',
      '.invoice-customer': 'input-customer',
      '.invoice-airmover': 'input-airmover'
    };

    Details.prototype.events = {
      'change input': 'update'
    };

    function Details() {
      this.render = __bind(this.render, this);
      this.update = __bind(this.update, this);
      Details.__super__.constructor.apply(this, arguments);
      this.model = new Invoice();
      this.model.on('refresh', this.render);
    }

    Details.prototype.update = function(e) {
      var name, value;
      name = this.elements['.' + e.target.className].slice(6);
      value = e.target.value;
      if (e.target.attributes.type.value === 'number') {
        value = parseInt(value, 10);
      }
      return this.model[name] = value;
    };

    Details.prototype.render = function() {
      var attrName, name, selector, _ref;
      _ref = this.elements;
      for (selector in _ref) {
        name = _ref[selector];
        attrName = name.slice(6);
        this[name].val(this.model[attrName]);
      }
    };

    return Details;

  })(Base.Controller);

  module.exports = Details;

}).call(this);
