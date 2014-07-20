'use strict';

var $ = require('jquery');
var React = require('react');
var fastClick = require('fastclick');
var Backbone = require('backbone');
var BackboneRelational = require('backbone-relational');
var BackboneMemento = require('backbone.memento');
var moment = require('moment');

Backbone.$ = $;
window.React = React; // trigger React Dev Tools
require('bluebird'); // fixes EMFILE error on OSX
moment.lang('en-NZ'); // set language for moment

var App = require('./components/app');

$(function() {
  fastClick(document.body);
  React.renderComponent(new App(), document.body);
});


// fetch info
require('./stores/app');
require('./stores/client');
require('./stores/invoice');
require('./stores/row');
require('./stores/snippet');
