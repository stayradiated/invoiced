(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (name, address, city, postcode, invoices) {
buf.push("<div class=\"details\"><h3>" + (jade.escape(null == (jade_interp = name) ? "" : jade_interp)) + "</h3><p><span class=\"address\">" + (jade.escape(null == (jade_interp = address) ? "" : jade_interp)) + "</span><span class=\"city\">" + (jade.escape(null == (jade_interp = city) ? "" : jade_interp)) + "</span><span class=\"postcode\">" + (jade.escape(null == (jade_interp = postcode) ? "" : jade_interp)) + "</span></p></div><div class=\"invoices-count number\">" + (jade.escape(null == (jade_interp = invoices.length) ? "" : jade_interp)) + "</div>");}("name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined,"address" in locals_for_with?locals_for_with.address:typeof address!=="undefined"?address:undefined,"city" in locals_for_with?locals_for_with.city:typeof city!=="undefined"?city:undefined,"postcode" in locals_for_with?locals_for_with.postcode:typeof postcode!=="undefined"?postcode:undefined,"invoices" in locals_for_with?locals_for_with.invoices:typeof invoices!=="undefined"?invoices:undefined));;return buf.join("");
};
},{"jade/runtime":17}],2:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<header><div class=\"details\"><h2>Clients</h2></div><div class=\"buttons\"><button type=\"button\" class=\"create-client\"><span class=\"halflings plus-sign\"></span>New Client</button></div></header>");;return buf.join("");
};
},{"jade/runtime":17}],3:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (number, moment, date, dateCreated, dateUpdated, paid, customer, site, email, labour, airmover, numeral, cost) {
buf.push("<header><h2>" + (jade.escape(null == (jade_interp = number) ? "" : jade_interp)) + "</h2><div class=\"created\"><span class=\"halflings calendar\"></span>" + (jade.escape(null == (jade_interp = moment(date).format('ddd Do MMMM YYYY')) ? "" : jade_interp)) + "</div><div class=\"date-created\"><span class=\"halflings calendar\"></span>" + (jade.escape(null == (jade_interp = moment(dateCreated).format('ddd Do MMMM YYYY hh:mm a')) ? "" : jade_interp)) + "</div><div class=\"date-updated\"><span class=\"halflings calendar\"></span>" + (jade.escape(null == (jade_interp = moment(dateUpdated).format('ddd Do MMMM YYYY hh:mm a')) ? "" : jade_interp)) + "</div><div class=\"paid-status\">");
if ( ! paid)
{
buf.push("<span class=\"halflings remove\"></span>Not Paid");
}
else
{
buf.push("<span class=\"halflings ok\"></span>Paid");
}
buf.push("</div><button type=\"button\" class=\"mark-paid\"><span class=\"halflings ok\"></span>Mark as Paid</button><button type=\"button\" class=\"delete\"><span class=\"halflings remove\"></span>Delete Invoice</button><button type=\"button\" class=\"secondary edit\"><span class=\"halflings pencil\"></span>Edit Invoice</button></header><div class=\"customer\"><div class=\"primary\"><h3>" + (jade.escape(null == (jade_interp = customer) ? "" : jade_interp)) + "</h3><h5>" + (jade.escape(null == (jade_interp = site) ? "" : jade_interp)) + "</h5><div class=\"email\">" + (jade.escape(null == (jade_interp = email) ? "" : jade_interp)) + "</div><div class=\"labour\">Labour:" + (jade.escape(null == (jade_interp = labour) ? "" : jade_interp)) + "</div><div class=\"airmover\">Air Mover:" + (jade.escape(null == (jade_interp = airmover) ? "" : jade_interp)) + "</div></div><div class=\"price number\">" + (jade.escape(null == (jade_interp = numeral(cost).format('$0,0.00')) ? "" : jade_interp)) + "</div></div>");}("number" in locals_for_with?locals_for_with.number:typeof number!=="undefined"?number:undefined,"moment" in locals_for_with?locals_for_with.moment:typeof moment!=="undefined"?moment:undefined,"date" in locals_for_with?locals_for_with.date:typeof date!=="undefined"?date:undefined,"dateCreated" in locals_for_with?locals_for_with.dateCreated:typeof dateCreated!=="undefined"?dateCreated:undefined,"dateUpdated" in locals_for_with?locals_for_with.dateUpdated:typeof dateUpdated!=="undefined"?dateUpdated:undefined,"paid" in locals_for_with?locals_for_with.paid:typeof paid!=="undefined"?paid:undefined,"customer" in locals_for_with?locals_for_with.customer:typeof customer!=="undefined"?customer:undefined,"site" in locals_for_with?locals_for_with.site:typeof site!=="undefined"?site:undefined,"email" in locals_for_with?locals_for_with.email:typeof email!=="undefined"?email:undefined,"labour" in locals_for_with?locals_for_with.labour:typeof labour!=="undefined"?labour:undefined,"airmover" in locals_for_with?locals_for_with.airmover:typeof airmover!=="undefined"?airmover:undefined,"numeral" in locals_for_with?locals_for_with.numeral:typeof numeral!=="undefined"?numeral:undefined,"cost" in locals_for_with?locals_for_with.cost:typeof cost!=="undefined"?cost:undefined));;return buf.join("");
};
},{"jade/runtime":17}],4:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (number, moment, date, customer, site, numeral, cost) {
buf.push("<div class=\"meta\"><div class=\"id number\">" + (jade.escape(null == (jade_interp = number) ? "" : jade_interp)) + "</div><div class=\"created\"><span class=\"halflings calendar\"></span>" + (jade.escape(null == (jade_interp = moment(date).format('Do MMMM YYYY')) ? "" : jade_interp)) + "</div><div class=\"paid-status\"><span class=\"halflings remove\"></span>Not Paid</div></div><div class=\"customer\"><div class=\"primary\"><h3>" + (jade.escape(null == (jade_interp = customer) ? "" : jade_interp)) + "</h3><h5>" + (jade.escape(null == (jade_interp = site) ? "" : jade_interp)) + "</h5></div><div class=\"price number\">" + (jade.escape(null == (jade_interp = numeral(cost).format('$0,0.00')) ? "" : jade_interp)) + "</div></div>");}("number" in locals_for_with?locals_for_with.number:typeof number!=="undefined"?number:undefined,"moment" in locals_for_with?locals_for_with.moment:typeof moment!=="undefined"?moment:undefined,"date" in locals_for_with?locals_for_with.date:typeof date!=="undefined"?date:undefined,"customer" in locals_for_with?locals_for_with.customer:typeof customer!=="undefined"?customer:undefined,"site" in locals_for_with?locals_for_with.site:typeof site!=="undefined"?site:undefined,"numeral" in locals_for_with?locals_for_with.numeral:typeof numeral!=="undefined"?numeral:undefined,"cost" in locals_for_with?locals_for_with.cost:typeof cost!=="undefined"?cost:undefined));;return buf.join("");
};
},{"jade/runtime":17}],5:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (name, address, city, postcode) {
buf.push("<header><div class=\"details\"><h2>" + (jade.escape(null == (jade_interp = name) ? "" : jade_interp)) + "</h2><p><span class=\"address\">" + (jade.escape(null == (jade_interp = address) ? "" : jade_interp)) + "</span><span class=\"city\">" + (jade.escape(null == (jade_interp = city) ? "" : jade_interp)) + "</span><span class=\"postcode\">" + (jade.escape(null == (jade_interp = postcode) ? "" : jade_interp)) + "</span></p></div><div class=\"buttons\"><button type=\"button\" class=\"edit-client\"><span class=\"halflings pencil\"></span>Edit Client Details</button><button type=\"button\" class=\"create-invoice primary\"><span class=\"halflings plus-sign\"></span>New Invoice</button></div></header><div class=\"editor\"><div class=\"row\"><label class=\"name\">Name</label><input placeholder=\"Name\"" + (jade.attr("value", name, true, false)) + " class=\"name\"/></div><div class=\"row\"><label class=\"address\">Address</label><input placeholder=\"Address\"" + (jade.attr("value", address, true, false)) + " class=\"address\"/></div><div class=\"row\"><label class=\"city\">City</label><input placeholder=\"City\"" + (jade.attr("value", city, true, false)) + " class=\"city\"/></div><div class=\"row\"><label class=\"postcode\">Post Code</label><input placeholder=\"Post Code\"" + (jade.attr("value", postcode, true, false)) + " class=\"postcode\"/></div><div class=\"buttons\"><button class=\"cancel\"><span class=\"halflings remove\"></span>Cancel</button><button class=\"primary save\"><span class=\"halflings ok\"></span>Save Changes</button></div></div>");}("name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined,"address" in locals_for_with?locals_for_with.address:typeof address!=="undefined"?address:undefined,"city" in locals_for_with?locals_for_with.city:typeof city!=="undefined"?city:undefined,"postcode" in locals_for_with?locals_for_with.postcode:typeof postcode!=="undefined"?postcode:undefined));;return buf.join("");
};
},{"jade/runtime":17}],6:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (number, moment, date, customer, site, email, airmover, labour, cost) {
buf.push("<h3>Invoice</h3><div class=\"control\"><label>Invoice ID</label><input type=\"number\" name=\"number\"" + (jade.attr("value", number, true, false)) + "/></div><div class=\"control\"><label>Created At</label><input type=\"date\" name=\"date\"" + (jade.attr("value", moment(date).format('YYYY-MM-DD'), true, false)) + "/></div><h3>Customer</h3><div class=\"control\"><label>Customer Name</label><input type=\"text\" name=\"customer\"" + (jade.attr("value", customer, true, false)) + "/></div><div class=\"control\"><label>Site</label><input type=\"text\" name=\"site\"" + (jade.attr("value", site, true, false)) + "/></div><div class=\"control\"><label>Email</label><input type=\"email\" name=\"email\"" + (jade.attr("value", email, true, false)) + "/></div><h3>Cost</h3><div class=\"control\"><label>Airmover Hire</label><input type=\"number\" name=\"airmover\"" + (jade.attr("value", airmover, true, false)) + "/></div><div class=\"control\"><label>Travel</label><input type=\"number\" name=\"labour\"" + (jade.attr("value", labour, true, false)) + "/></div><div class=\"control\"><label>Total</label><input type=\"number\" name=\"cost\"" + (jade.attr("value", cost, true, false)) + "/></div>");}("number" in locals_for_with?locals_for_with.number:typeof number!=="undefined"?number:undefined,"moment" in locals_for_with?locals_for_with.moment:typeof moment!=="undefined"?moment:undefined,"date" in locals_for_with?locals_for_with.date:typeof date!=="undefined"?date:undefined,"customer" in locals_for_with?locals_for_with.customer:typeof customer!=="undefined"?customer:undefined,"site" in locals_for_with?locals_for_with.site:typeof site!=="undefined"?site:undefined,"email" in locals_for_with?locals_for_with.email:typeof email!=="undefined"?email:undefined,"airmover" in locals_for_with?locals_for_with.airmover:typeof airmover!=="undefined"?airmover:undefined,"labour" in locals_for_with?locals_for_with.labour:typeof labour!=="undefined"?labour:undefined,"cost" in locals_for_with?locals_for_with.cost:typeof cost!=="undefined"?cost:undefined));;return buf.join("");
};
},{"jade/runtime":17}],7:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<ul class=\"rows\"><li class=\"item\">Item</li><li class=\"bullet\">Bullet</li><li class=\"heading\">Heading</li><li class=\"date\">Date</li></ul><ul class=\"invoice\"><li class=\"templates\">Templates</li><li class=\"save\">Save</li><li class=\"generate\">Generate</li></ul>");;return buf.join("");
};
},{"jade/runtime":17}],8:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (content) {
buf.push("<span class=\"bullet\">•</span><input type=\"text\"" + (jade.attr("value", content, true, false)) + "/><button type=\"button\" tabindex=\"-1\" class=\"switch-type\"><span class=\"halflings refresh\"></span></button><button type=\"button\" tabindex=\"-1\" class=\"primary delete\"><span class=\"halflings remove\"></span></button>");}("content" in locals_for_with?locals_for_with.content:typeof content!=="undefined"?content:undefined));;return buf.join("");
};
},{"jade/runtime":17}],9:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (content) {
buf.push("<span>Job Date:</span><input type=\"date\"" + (jade.attr("value", content, true, false)) + "/><div class=\"fill\"></div><button type=\"button\" tabindex=\"-1\" class=\"primary delete\"><span class=\"halflings remove\"></span></button>");}("content" in locals_for_with?locals_for_with.content:typeof content!=="undefined"?content:undefined));;return buf.join("");
};
},{"jade/runtime":17}],10:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (content) {
buf.push("<input type=\"text\"" + (jade.attr("value", content, true, false)) + "/><button type=\"button\" tabindex=\"-1\" class=\"switch-type\"><span class=\"halflings refresh\"></span></button><button type=\"button\" tabindex=\"-1\" class=\"primary delete\"><span class=\"halflings remove\"></span></button>");}("content" in locals_for_with?locals_for_with.content:typeof content!=="undefined"?content:undefined));;return buf.join("");
};
},{"jade/runtime":17}],11:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (order, content) {
buf.push("<span class=\"bullet\">" + (jade.escape(null == (jade_interp = order) ? "" : jade_interp)) + "</span><input type=\"text\"" + (jade.attr("value", content, true, false)) + "/><button type=\"button\" tabindex=\"-1\" class=\"switch-type\"><span class=\"halflings refresh\"></span></button><button type=\"button\" tabindex=\"-1\" class=\"primary delete\"><span class=\"halflings remove\"></span></button>");}("order" in locals_for_with?locals_for_with.order:typeof order!=="undefined"?order:undefined,"content" in locals_for_with?locals_for_with.content:typeof content!=="undefined"?content:undefined));;return buf.join("");
};
},{"jade/runtime":17}],12:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<h1 class=\"logo\">Invoiced<span class=\"glyphicons shopping_cart\"></span></h1><nav><a href=\"#settings\" class=\"settings\"><span class=\"glyphicons settings\"></span>Settings</a><a href=\"#editor\" class=\"editor\"><span class=\"glyphicons pen\"></span>Editor</a><a href=\"#clients\" class=\"clients active\"><span class=\"glyphicons group\"></span>Clients</a><a href=\"#invoices\" class=\"invoices\"><span class=\"glyphicons notes\"></span>Invoices</a></nav>");;return buf.join("");
};
},{"jade/runtime":17}],13:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"clients-container\"></div><div class=\"invoices-container\"></div><div class=\"details-container\"></div>");;return buf.join("");
};
},{"jade/runtime":17}],14:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"details-container\"></div><div class=\"editor-container\"><div class=\"header-container\"></div><div class=\"rows-container\"></div></div>");;return buf.join("");
};
},{"jade/runtime":17}],15:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

;return buf.join("");
};
},{"jade/runtime":17}],16:[function(require,module,exports){
module.exports=require(15)
},{"jade/runtime":17}],17:[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jade=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = merge(attrs, a[i]);
    }
    return attrs;
  }
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    a['class'] = ac.concat(bc).filter(nulls);
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {*} val
 * @return {Boolean}
 * @api private
 */

function nulls(val) {
  return val != null && val !== '';
}

/**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 */
exports.joinClasses = joinClasses;
function joinClasses(val) {
  return Array.isArray(val) ? val.map(joinClasses).filter(nulls).join(' ') : val;
}

/**
 * Render the given classes.
 *
 * @param {Array} classes
 * @param {Array.<Boolean>} escaped
 * @return {String}
 */
exports.cls = function cls(classes, escaped) {
  var buf = [];
  for (var i = 0; i < classes.length; i++) {
    if (escaped && escaped[i]) {
      buf.push(exports.escape(joinClasses([classes[i]])));
    } else {
      buf.push(joinClasses(classes[i]));
    }
  }
  var text = joinClasses(buf);
  if (text.length) {
    return ' class="' + text + '"';
  } else {
    return '';
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = function attr(key, val, escaped, terse) {
  if ('boolean' == typeof val || null == val) {
    if (val) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    } else {
      return '';
    }
  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
  } else if (escaped) {
    return ' ' + key + '="' + exports.escape(val) + '"';
  } else {
    return ' ' + key + '="' + val + '"';
  }
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 */
exports.attrs = function attrs(obj, terse){
  var buf = [];

  var keys = Object.keys(obj);

  if (keys.length) {
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('class' == key) {
        if (val = joinClasses(val)) {
          buf.push(' ' + key + '="' + val + '"');
        }
      } else {
        buf.push(exports.attr(key, val, false, terse));
      }
    }
  }

  return buf.join('');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  var result = String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  if (result === '' + html) return html;
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str =  str || _dereq_('fs').readFileSync(filename, 'utf8')
  } catch (ex) {
    rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

},{"fs":2}],2:[function(_dereq_,module,exports){

},{}]},{},[1])
(1)
});
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],18:[function(require,module,exports){
'use strict';

var App = new Marionette.Application();

App.addRegions({
  page: '.page-container',
  header: '.header-container'
});

$(function() {
  FastClick.attach(document.body);
  App.start();
});

module.exports = App;

// load pages controller
require('./controllers/pages');

},{"./controllers/pages":22}],19:[function(require,module,exports){
module.exports={
  "root": "http://localhost:8080"
}

},{}],20:[function(require,module,exports){
var App = require('../app');

// Views
var ClientsPage = require('../views/pages/clients');
var ClientsView = require('../views/clients/clients');
var InvoicesView = require('../views/clients/invoices');
var DetailsView = require('../views/clients/details');

// Models
var Client = require('../models/client');

var ClientsController = function (clients) {
  this.clients = clients;
  this.view = new ClientsPage();
  this.view.on('render', this.showClients, this);
};

_.extend(ClientsController.prototype, {


  open: function (client) {
    this.view.details.close();

    var view = new InvoicesView({
      model: client,
      collection: client.get('invoices')
    });

    view.on('select:invoice', this.showDetails, this);
    view.on('create:invoice', this.createInvoice, this);

    this.view.invoices.show(view);

    return view;
  },

  showClients: function () {
    var clientsView = new ClientsView({ collection: this.clients });
    clientsView.on('select:client', this.showInvoices, this);
    clientsView.on('create:client', this.createClient, this);
    this.view.clients.show(clientsView);
  },

  showInvoices: function (client) {
    App.router.navigate('/clients/' + client.id, {trigger: true});
  },

  showDetails: function (invoice) {
    var detailsView = new DetailsView({ model: invoice });
    detailsView.on('edit:invoice', function (invoice) {
      App.router.navigate('/editor/' + invoice.id, {trigger: true});
    });
    this.view.details.show(detailsView);
  },

  createClient: function () {
    var client = new Client();

    client.on('sync', function () {
      console.log('adding client to all clients');
      this.clients.add(client);
    }, this);

    var view = this.showInvoices(client);
    view.showEditor();
  },

  createInvoice: function (client) {
    App.router.navigate('/editor/create/' + client.id, {trigger: true});
  }

});

module.exports = ClientsController;

},{"../app":18,"../models/client":23,"../views/clients/clients":32,"../views/clients/details":33,"../views/clients/invoices":35,"../views/pages/clients":44}],21:[function(require,module,exports){
'use strict';

var EditorPage = require('../views/pages/editor');
var Invoice = require('../models/invoice');

// Views
var HeaderView = require('../views/editor/header');
var DetailsView = require('../views/editor/details');
var RowsView = require('../views/editor/rows');

var EditorController = function () {
  this.view = new EditorPage();
  this.view.on('render', this.showInvoice, this);
};

_.extend(EditorController.prototype, {

  open: function (invoice) {
    console.log('Editor: opening invoice', invoice);
    this.invoice = invoice;
    this.showInvoice();
  },

  create: function (client) {
    console.log('Editor: creating invoice for client', client);
    var invoice = new Invoice({
      client: client,
      customer: client.get('name'),
      site: client.get('address')
    });
    return this.open(invoice);
  },

  showInvoice: function () {
    if (! this.invoice) {
      console.log('Editor: Not sure what to do?');
      return;
    }

    var detailsView = new DetailsView({ model: this.invoice });
    var headerView = new HeaderView();
    var rowsView = new RowsView({ collection: this.invoice.get('rows') });

    headerView.on('save', this.save, this);
    headerView.on('create:row', this.createRow, this);

    this.view.header.show(headerView);
    this.view.details.show(detailsView);
    this.view.rows.show(rowsView);
  },

  save: function () {
    this.invoice.save(undefined, { patch: true });
    this.invoice.get('rows').each(function (row) {
      if (row.hasChanged()) row.save(undefined, { patch: true });
    });
  },

  createRow: function (type) {
    this.invoice.get('rows').create({
      type: type
    });
  }

});

module.exports = EditorController;

},{"../models/invoice":25,"../views/editor/details":36,"../views/editor/header":37,"../views/editor/rows":42,"../views/pages/editor":45}],22:[function(require,module,exports){
var App = require('../app');

// Controllers
var ClientsController = require('./clients');
var EditorController = require('./editor');

// Views
var HeaderView = require('../views/header');

// Models
var ClientsCollection = require('../models/clients');
var InvoicesCollection = require('../models/invoices');
var RowsCollection = require('../models/rows');

var Router = Backbone.Marionette.AppRouter.extend({
  appRoutes: {
    '':                   'showClientsPage',

    'clients':            'showClientsPage',
    'clients/:id':        'openClient',

    'editor':             'showEditorPage',
    'editor/:id':         'openInvoiceInEditor',
    'editor/create/:id':  'createInvoice'
  }
});

var PagesController = function () {
  this.models = {
    clients: new ClientsCollection(),
    invoices: new InvoicesCollection(),
    rows: new RowsCollection()
  };

  this._loaded = 0;

  _.each(this.models, function (model) {
    model.fetch({ reset: true });
    model.once('reset', this.startHistory, this);
  }, this);

  this.pages = {
    clients: new ClientsController(this.models.clients),
    editor: new EditorController(this.models.invoices)
  };

  this.page = null;
};

_.extend(PagesController.prototype, {

  startHistory: function () {
    this._loaded += 1;
    if (this._loaded === _.keys(this.models).length) {
      Backbone.history.start();
    }
  },

  start: function () {
    this.showHeader();
  },

  showHeader: function () {
    var headerView = new HeaderView();
    App.header.show(headerView);
  },

  showPage: function (page) {
    if (this.page !== page) {
      console.log('Pages: opening page', page);
      App.trigger('select:page', page);
      App.page.show(this.pages[page].view);
      this.page = page;
    }
  },


  /*
   * CLIENTS
   */

  showClientsPage: function () {
    this.showPage('clients');
  },

  openClient: function (clientId) {
    var client = this.models.clients.get(clientId);
    this.showPage('clients');
    this.pages.clients.open(client);
  },


  /*
   * EDITOR
   */

  showEditorPage: function () {
    this.showPage('editor');
  },

  openInvoiceInEditor: function (invoiceId) {
    var invoice = this.models.invoices.get(invoiceId);
    this.pages.editor.open(invoice);
    this.showPage('editor');
  },

  createInvoice: function (clientId) {
    var client = this.models.clients.get(clientId);
    this.showPage('editor');
    this.pages.editor.create(client);
  },

});

App.addInitializer(function () {
  var pagesController = new PagesController();
  App.router = new Router({ controller: pagesController });
  pagesController.start();
});

module.exports = PagesController;

},{"../app":18,"../models/clients":24,"../models/invoices":26,"../models/rows":28,"../views/header":43,"./clients":20,"./editor":21}],23:[function(require,module,exports){
'use strict';

var Invoice = require('./invoice');
var Invoices = require('./invoices');
var config = require('../config');

var Client = Backbone.RelationalModel.extend({

  urlRoot: config.root + '/clients',

  defaults: {
    name: '',
    address: '',
    city: '',
    postcode: '',
    createdAt: null,
    updatedAt: null 
  },

  relations: [{
    type: 'HasMany',
    key: 'invoices',
    relatedModel: Invoice,
    collectionType: Invoices,
    includeInJSON: 'id',
    reverseRelation: {
      key: 'client',
      includeInJSON: 'id'
    }
  }],

  parse: function (json) {
    json.date = new Date(json.date);
    json.createdAt = new Date(json.createdAt);
    json.updatedAt = new Date(json.updatedAt);
    return json;
  }

});

module.exports = Client;

},{"../config":19,"./invoice":25,"./invoices":26}],24:[function(require,module,exports){
'use strict';

var Client = require('./client');
var config = require('../config');

var Clients = Backbone.Collection.extend({

  model: Client,

  url: config.root + '/clients',

  comparator: 'name'

});

module.exports = Clients;

},{"../config":19,"./client":23}],25:[function(require,module,exports){
'use strict';

var Row = require('./row');
var Rows = require('./rows');
var config = require('../config');

var Invoice = Backbone.RelationalModel.extend({

  urlRoot: config.root + '/invoices',

  defaults: {
    client: null,
    number: null,

    date: new Date(),
    paid: 0,

    customer: '',
    email: '',
    site: '',

    cost: 0,
    labour: 0,
    airmover: 0,

    createdAt: '',
    updatedAt: ''
  },

  relations: [{
    type: 'HasMany',
    key: 'rows',
    relatedModel: Row,
    collectionType: Rows,
    includeInJSON: false,
    reverseRelation: {
      key: 'invoice',
      includeInJSON: 'id'
    }
  }]

});

module.exports = Invoice;

},{"../config":19,"./row":27,"./rows":28}],26:[function(require,module,exports){
'use strict';

var Invoice = require('./invoice');
var config = require('../config');

var Invoices = Backbone.Collection.extend({

  model: Invoice,

  url: config.root + '/invoices',

  comparator: 'id'

});

module.exports = Invoices;

},{"../config":19,"./invoice":25}],27:[function(require,module,exports){
'use strict';

var config = require('../config');

var Row = Backbone.RelationalModel.extend({

  urlRoot: config.root + '/rows',

  ITEM: 0,
  BULLET: 1,
  HEADING: 2,
  DATE: 3,

  defaults: { 
    invoice: null,
    order: 0,
    content: ''
  }

});

module.exports = Row;

},{"../config":19}],28:[function(require,module,exports){
'use strict';

var Row = require('./row');
var config = require('../config');

var Rows = Backbone.Collection.extend({

  model: Row,

  url: config.root + '/rows',

  comparator: 'order'

});

module.exports = Rows;

},{"../config":19,"./row":27}],29:[function(require,module,exports){
module.exports = {
  '../../jade/header.jade': require('../../jade/header.jade'),
  '../../jade/clients/client.jade': require('../../jade/clients/client.jade'),
  '../../jade/clients/clients.jade': require('../../jade/clients/clients.jade'),
  '../../jade/clients/details.jade': require('../../jade/clients/details.jade'),
  '../../jade/clients/invoice.jade': require('../../jade/clients/invoice.jade'),
  '../../jade/clients/invoices.jade': require('../../jade/clients/invoices.jade'),
  '../../jade/editor/details.jade': require('../../jade/editor/details.jade'),
  '../../jade/editor/header.jade': require('../../jade/editor/header.jade'),
  '../../jade/editor/row_bullet.jade': require('../../jade/editor/row_bullet.jade'),
  '../../jade/editor/row_date.jade': require('../../jade/editor/row_date.jade'),
  '../../jade/editor/row_heading.jade': require('../../jade/editor/row_heading.jade'),
  '../../jade/editor/row_item.jade': require('../../jade/editor/row_item.jade'),
  '../../jade/pages/clients.jade': require('../../jade/pages/clients.jade'),
  '../../jade/pages/editor.jade': require('../../jade/pages/editor.jade'),
  '../../jade/pages/invoices.jade': require('../../jade/pages/invoices.jade'),
  '../../jade/pages/settings.jade': require('../../jade/pages/settings.jade'),
};

},{"../../jade/clients/client.jade":1,"../../jade/clients/clients.jade":2,"../../jade/clients/details.jade":3,"../../jade/clients/invoice.jade":4,"../../jade/clients/invoices.jade":5,"../../jade/editor/details.jade":6,"../../jade/editor/header.jade":7,"../../jade/editor/row_bullet.jade":8,"../../jade/editor/row_date.jade":9,"../../jade/editor/row_heading.jade":10,"../../jade/editor/row_item.jade":11,"../../jade/header.jade":12,"../../jade/pages/clients.jade":13,"../../jade/pages/editor.jade":14,"../../jade/pages/invoices.jade":15,"../../jade/pages/settings.jade":16}],30:[function(require,module,exports){
'use strict';

var jade = require('./jade');

var prefix = '../../jade/';
var suffix = '.jade';

var template = function (path) {
  return jade[prefix + path + suffix];
};

module.exports = template;

},{"./jade":29}],31:[function(require,module,exports){
'use strict';

var template = require('../../utils/template');

var Client = Backbone.Marionette.ItemView.extend({

  className: 'client',
  template: template('clients/client'),

  events: {
    'click': 'select'
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model.get('invoices'), 'add remove', this.render);
  },

  select: function () {
    this.trigger('select');
    this.$el.addClass('active');
  }

});

module.exports = Client;

},{"../../utils/template":30}],32:[function(require,module,exports){
'use strict';

var template = require('../../utils/template');
var Client = require('./client');

var ClientsList = Marionette.CollectionView.extend({
  className: 'client-collection',
  itemView: Client,

  // https://github.com/marionettejs/backbone.marionette/wiki/Adding-support-for-sorted-collections
  appendHtml: function (collectionView, itemView, index) {
      var childrenContainer = collectionView.itemViewContainer ? collectionView.$(collectionView.itemViewContainer) : collectionView.$el;
      var children = childrenContainer.children();
      if (children.size() <= index) {
        childrenContainer.append(itemView.el);
      } else {
        children.eq(index).before(itemView.el);
      }
    }
});

module.exports = Clients;
var Clients = Marionette.BossView.extend({

  className: 'clients',
  template: template('clients/clients'),

  subViews: {
    list: ClientsList
  },

  subViewEvents: {
    'list itemview:select': 'selectClient'
  },

  events: {
    'click .create-client': 'createClient',
  },

  createClient: function () {
    this.trigger('create:client');
  },

  selectClient: function (view) {
    this.$el.find('.active').removeClass('active');
    var client = view.model;
    this.trigger('select:client', client);
  }

});

module.exports = Clients;

},{"../../utils/template":30,"./client":31}],33:[function(require,module,exports){
'use strict';

var template = require('../../utils/template');

var Details = Backbone.Marionette.ItemView.extend({

  className: 'details',
  template: template('clients/details'),

  events: {
    'click .edit': 'editInvoice',
    'click .delete': 'destroyInvoice',
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },

  editInvoice: function () {
    this.trigger('edit:invoice', this.model);
  },

  destroyInvoice: function () {
    this.model.destroy();
  }

});

module.exports = Details;

},{"../../utils/template":30}],34:[function(require,module,exports){
'use strict';

var template = require('../../utils/template');

var Invoice = Backbone.Marionette.ItemView.extend({

  className: 'invoice',
  template: template('clients/invoice'),

  events: {
    'click': 'select'
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  select: function () {
    this.trigger('select');
    this.$el.addClass('active');
  }

});

module.exports = Invoice;

},{"../../utils/template":30}],35:[function(require,module,exports){
'use strict';

var template = require('../../utils/template');
var Invoice = require('./invoice');

var InvoicesList = Marionette.CollectionView.extend({
  className: 'invoice-collection',
  itemView: Invoice
});

var Invoices = Marionette.BossView.extend({

  className: 'invoices',
  template: template('clients/invoices'),

  subViews: {
    list: InvoicesList
  },

  subViewEvents: {
    'list itemview:select': 'selectInvoice'
  },

  ui: {
    name: 'input.name',
    address: 'input.address',
    city: 'input.city',
    postcode: 'input.postcode'
  },

  events: {
    'click .create-invoice': 'createInvoice',
    'click .edit-client': 'showEditor',
    'click .editor .cancel': 'hideEditor',
    'click .editor .save': 'saveChanges'
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  onRender: function () {
    var first = this.list.children.first();
    if (first) first.select();
  },

  showEditor: function () {
    this.$el.addClass('edit');
    this.ui.name.focus();
  },

  hideEditor: function () {
    this.$el.removeClass('edit');
  },

  saveChanges: function () {
    this.hideEditor();
    this.model.save({
      name: this.ui.name.val(),
      address: this.ui.address.val(),
      city: this.ui.city.val(),
      postcode: this.ui.postcode.val()
    }, { patch: true });
  },

  createInvoice: function () {
    this.trigger('create:invoice', this.model);
  },

  selectInvoice: function (view) {
    this.$el.find('.active').removeClass('active');
    var invoice = view.model;
    this.trigger('select:invoice', invoice);
  }

});

module.exports = Invoices;

},{"../../utils/template":30,"./invoice":34}],36:[function(require,module,exports){
'use strict';

var template = require('../../utils/template');

var Details = Backbone.Marionette.ItemView.extend({

  className: 'details',
  template: template('editor/details'),

  events: {
    'change input': 'change'
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  change: function (e) {
    var input = $(e.target);
    var attr = input.attr('name');
    this.model.set(attr, input.val());
  }

});

module.exports = Details;

},{"../../utils/template":30}],37:[function(require,module,exports){
'use strict';

var template = require('../../utils/template');

var Header = Backbone.Marionette.ItemView.extend({

  className: 'header',
  template: template('editor/header'),

  events: {
    'click .save': 'save',
    
    'click .item': 'createItem',
    'click .bullet': 'createBullet',
    'click .heading': 'createHeading',
    'click .date': 'createDate'
  },

  save: function () {
    this.trigger('save');
  },

  createItem: function () {
    this.trigger('create:row', 0);
  },

  createBullet: function () {
    this.trigger('create:row', 1);
  },

  createHeading: function () {
    this.trigger('create:row', 2);
  },

  createDate: function () {
    this.trigger('create:row', 3);
  }

});

module.exports = Header;

},{"../../utils/template":30}],38:[function(require,module,exports){
'use strict';

var template = require('../../utils/template');

var RowBullet = Backbone.Marionette.ItemView.extend({

  className: 'row bullet',
  template: template('editor/row_bullet'),

  ui: {
    input: 'input',
  },

  events: {
    'change input': 'change',
    'click .switch-type': 'switchType',
    'click .delete': 'destroy',
  },

  change: function () {
    this.model.set('content', this.ui.input.val());
  },

  switchType: function () {
    this.model.set('type', 2);
  },

  destroy: function () {
    this.model.destroy();
  }

});

module.exports = RowBullet;

},{"../../utils/template":30}],39:[function(require,module,exports){
'use strict';

var template = require('../../utils/template');

var RowDate = Backbone.Marionette.ItemView.extend({

  className: 'row date',
  template: template('editor/row_date'),

  ui: {
    input: 'input',
  },

  events: {
    'change input': 'change',
    'click .delete': 'destroy'
  },

  change: function () {
    this.model.set('content', this.ui.input.val());
  },

  destroy: function () {
    this.model.destroy();
  }

});

module.exports = RowDate;

},{"../../utils/template":30}],40:[function(require,module,exports){
'use strict';

var template = require('../../utils/template');

var RowHeading = Backbone.Marionette.ItemView.extend({

  className: 'row heading',
  template: template('editor/row_heading'),

  ui: {
    input: 'input',
  },

  events: {
    'change input': 'change',
    'click .switch-type': 'switchType',
    'click .delete': 'destroy',
  },

  change: function () {
    this.model.set('content', this.ui.input.val());
  },

  switchType: function () {
    this.model.set('type', 0);
  },

  destroy: function () {
    this.model.destroy();
  }

});

module.exports = RowHeading;

},{"../../utils/template":30}],41:[function(require,module,exports){
'use strict';

var template = require('../../utils/template');

var RowItem = Backbone.Marionette.ItemView.extend({

  className: 'row item',
  template: template('editor/row_item'),

  ui: {
    input: 'input',
  },

  events: {
    'change input': 'change',
    'click .switch-type': 'switchType',
    'click .delete': 'destroy'
  },

  change: function () {
    this.model.set('content', this.ui.input.val());
  },

  switchType: function () {
    this.model.set('type', 1);
  },

  destroy: function () {
    this.model.destroy();
  }

});

module.exports = RowItem;


},{"../../utils/template":30}],42:[function(require,module,exports){
'use strict';

var RowDateView = require('./row_date');
var RowBulletView = require('./row_bullet');
var RowNumberView = require('./row_item');
var RowHeadingView = require('./row_heading');

var Rows = Backbone.Marionette.CollectionView.extend({

  className: 'rows',

  getItemView: function (row) {
    switch (row.get('type')) {
      case row.DATE:     return RowDateView;
      case row.HEADING:  return RowHeadingView;
      case row.ITEM:     return RowNumberView;
      case row.BULLET:   return RowBulletView;
    }
  },

  initialize: function () {
    this.listenTo(this.collection, 'change:type', this.render);
  }

});

module.exports = Rows;

},{"./row_bullet":38,"./row_date":39,"./row_heading":40,"./row_item":41}],43:[function(require,module,exports){
'use strict';

var App = require('../app');
var template = require('../utils/template');

var HeaderView = Marionette.ItemView.extend({

  className: 'header',
  template: template('header'),

  initialize: function () {
    this.listenTo(App, 'select:page', this.setActive);
  },

  setActive: function (page) {
    this.$('.active').removeClass('active');
    this.$('a.' + page).addClass('active');
  }

});

module.exports = HeaderView;

},{"../app":18,"../utils/template":30}],44:[function(require,module,exports){
'use strict';

var template = require('../../utils/template');

var Clients = Backbone.Marionette.Layout.extend({

  className: 'page-clients',
  template: template('pages/clients'),

  regions: {
    clients: '.clients-container',
    invoices: '.invoices-container',
    details: '.details-container'
  }

});

module.exports = Clients;

},{"../../utils/template":30}],45:[function(require,module,exports){
'use strict';

var template = require('../../utils/template');

var Editor = Backbone.Marionette.Layout.extend({

  className: 'page-editor',
  template: template('pages/editor'),

  regions: {
    header: '.header-container',
    details: '.details-container',
    rows: '.rows-container',
  }

});

module.exports = Editor;

},{"../../utils/template":30}]},{},[18])