// Generated by CoffeeScript 1.6.3
(function() {
  var Base, Invoice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('base');

  require('date-utils');

  Invoice = (function(_super) {
    __extends(Invoice, _super);

    Invoice.prototype.defaults = {
      id: 7300,
      clientId: -1,
      date: new Date().toYMD(),
      customer: '',
      site: '',
      cost: 0,
      paid: 0
    };

    function Invoice() {
      this["export"] = __bind(this["export"], this);
      this.invoiceDueDate = __bind(this.invoiceDueDate, this);
      this.invoiceDate = __bind(this.invoiceDate, this);
      Invoice.__super__.constructor.apply(this, arguments);
    }

    Invoice.prototype.invoiceDate = function() {
      var date;
      date = new Date(this.date);
      return date.toFormat('DD MMMM YYYY');
    };

    Invoice.prototype.invoiceDueDate = function() {
      var date;
      date = new Date(this.date);
      date.add({
        days: 7
      });
      return date.toFormat('DD MMMM YYYY');
    };

    Invoice.prototype["export"] = function() {
      return {
        invoiceId: this.id,
        invoiceDate: this.invoiceDate(),
        invoiceDue: this.invoiceDueDate().toUpperCase(),
        jobCustomer: this.customer.toUpperCase(),
        jobSite: this.site.toUpperCase(),
        jobAmount: this.cost,
        jobGst: Math.floor(this.cost * 0.15 * 100) / 100,
        jobBeforeGst: Math.floor((this.cost - (this.cost * 0.15)) * 100) / 100
      };
    };

    return Invoice;

  })(Base.Model);

  module.exports = Invoice;

}).call(this);