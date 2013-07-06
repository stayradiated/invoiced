// Generated by CoffeeScript 1.6.3
(function() {
  var App, Base, Details, Search, Snippets, Storage, Table, docx, fs,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  fs = require('fs');

  Base = require('../libs/base');

  Search = require('../controllers/search');

  Table = require('../controllers/table');

  Details = require('../controllers/details');

  Snippets = require('../controllers/snippets');

  docx = require('../libs/docx');

  Storage = require('../libs/storage');

  App = (function(_super) {
    __extends(App, _super);

    App.prototype.elements = {
      '.search': 'search',
      '.table': 'table',
      '.snippets': 'snippets',
      '.details': 'details',
      '#save-file': 'file'
    };

    App.prototype.events = {
      'click .generate': 'generateButton',
      'click .toggle-sidebar': 'toggle'
    };

    function App() {
      this.importData = __bind(this.importData, this);
      this.saveState = __bind(this.saveState, this);
      this.toggle = __bind(this.toggle, this);
      this.buildDoc = __bind(this.buildDoc, this);
      this.generateButton = __bind(this.generateButton, this);
      var _this = this;
      App.__super__.constructor.apply(this, arguments);
      this.storage = new Storage();
      this.storage.on('error', function(err, message) {
        console.log('Showing error window');
        return console.log('Error message:', message);
      });
      this.storage.start();
      this.table = new Table({
        el: this.table
      });
      this.details = new Details({
        el: this.details
      });
      this.snippets = new Snippets({
        el: this.snippets
      });
      this.search = new Search({
        el: this.search,
        storage: this.storage
      });
      this.details.render();
      this.file.on('change', function(e) {
        var extension, path;
        path = e.target.value;
        extension = '.docx';
        if (path.slice(-5) !== extension) {
          path += extension;
        }
        return _this.buildDoc(path);
      });
    }

    App.prototype.generateButton = function() {
      return this.file.click();
    };

    App.prototype.buildDoc = function(path) {
      var details, table;
      details = this.details.model["export"]();
      table = this.table.rows["export"]();
      return docx(path, details, table);
    };

    App.prototype.toggle = function() {
      return this.el.toggleClass('no-snippets');
    };

    App.prototype.saveState = function() {
      return this.storage.saveInvoice({
        details: this.details.model.toJSON(),
        table: this.table.rows.toJSON()
      });
    };

    App.prototype.importData = function() {
      var path,
        _this = this;
      path = __dirname + '/../../data.json';
      fs.readFile(path, function(err, data) {
        if (err != null) {
          return console.error(err);
        }
        data = JSON.parse(data.toString());
        _this.details.model.refresh(data.details);
        return _this.table.rows.refresh(data.table);
      });
    };

    return App;

  })(Base.Controller);

  module.exports = App;

}).call(this);
