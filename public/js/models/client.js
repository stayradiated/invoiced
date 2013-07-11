// Generated by CoffeeScript 1.6.3
(function() {
  var Base, Client,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('base');

  Client = (function(_super) {
    __extends(Client, _super);

    Client.prototype.defaults = {
      id: null,
      name: '',
      address: '',
      city: '',
      postcode: ''
    };

    function Client() {
      Client.__super__.constructor.apply(this, arguments);
    }

    return Client;

  })(Base.Model);

  module.exports = Client;

}).call(this);
