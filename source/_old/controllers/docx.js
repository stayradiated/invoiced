'use strict';

var fs = require('fs');
var zip = require('./zip');
var Promise = require('bluebird');

var tmpl = function(template, namespace) {
  var fn = function(existing, fieldName) {
    if (namespace.hasOwnProperty(fieldName)) {
      return escape(namespace[fieldName]);
    }
    return existing;
  };
  return template.replace(/Z([A-Za-z0-9_|.]*)X/g, fn);
};

var escape = function(text) {
  if (! _.isString(text)) text = text.toString();
  return text.replace(/&(?!amp;)/g, '&amp;');
};

var config = {};
config.docs = __dirname + '/../../../template/';
config.folder = config.docs + 'template/';
config.template = config.folder + 'word/document.xml';

var templates = {
  document:     config.docs + 'document.xml.tmpl',
  rowNumber:    config.docs + 'row.number.xml.tmpl',
  rowBullet:    config.docs + 'row.bullet.xml.tmpl',
  rowHeading:   config.docs + 'row.heading.xml.tmpl',
  rowLabour:    config.docs + 'row.labour.xml.tmpl',
  rowAirMover:  config.docs + 'row.airmover.xml.tmpl'
};

var content = {};
var loaded = false;

var readFile = function(name, path) {
  var deferred = Promise.defer();
  fs.readFile(path, function(err, contents) {
    if (err) {
      console.error(err);
      return deferred.reject(err);
    }
    return deferred.resolve([name, contents.toString()]);
  });
  return deferred.promise;
};

var loadFiles = function(fn) {
  var file, path, requests;
  requests = [];
  for (file in templates) {
    path = templates[file];
    requests.push(readFile(file, path));
  }
  return Promise.all(requests, function(contents) {
    var text, _i, _len, _ref;
    for (_i = 0, _len = contents.length; _i < _len; _i++) {
      _ref = contents[_i], file = _ref[0], text = _ref[1];
      content[file] = text;
    }
    loaded = true;
    if (fn) {
      return fn();
    }
  });
};

var compile = function(path, _arg) {
  var args, client, data, invoice, jobDate, output, row, rows, startDate, _i, _len;
  client = _arg.client, invoice = _arg.invoice, rows = _arg.rows;
  if (!loaded) {
    args = arguments;
    return loadFiles(function() {
      return compile.apply(this, args);
    });
  }
  data = {};
  data.rows = "";
  startDate = '';
  jobDate = '';
  for (_i = 0, _len = rows.length; _i < _len; _i++) {
    row = rows[_i];
    row.jobDate = jobDate;
    switch (row.type) {
      case 'heading':
        data.rows += tmpl(content.rowHeading, row);
        break;
      case 'number':
        data.rows += tmpl(content.rowNumber, row);
        break;
      case 'bullet':
        data.rows += tmpl(content.rowBullet, row);
        break;
      case 'section':
        jobDate = row.name;
        if (startDate === '') {
          startDate = jobDate;
        }
    }
    if (row.type !== 'section') {
      jobDate = '';
    }
  }
  data.jobDate = startDate;
  if (invoice.labour !== '0.00') {
    data.rows += tmpl(content.rowLabour, {
      cost: invoice.labour
    });
  }
  delete invoice.labour;
  if (invoice.airmover !== '0.00') {
    data.rows += tmpl(content.rowAirMover, {
      cost: invoice.airmover
    });
  }
  delete invoice.airmover;
  _.extend(data, client);
  _.extend(data, invoice);
  output = tmpl(content.document, data);
  return fs.writeFile(config.template, output, function(err) {
    return zip(config.folder, path);
  });
};

module.exports = compile;
