'use strict';

var React = require('react');

var Row = require('../../models/row');
var ROW = require('../../constants/row');

var Header = React.createClass({

  getDefaultProps: function () {
    return {
      invoice: null
    };
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <header>
        <ul className='rows'>
          <li className='item'
            onClick={this.createRow.bind(this, ROW.ITEM)}
          >Item</li>
          <li className='bullet'
            onClick={this.createRow.bind(this, ROW.BULLET)}
          >Bullet</li>
          <li className='heading'
            onClick={this.createRow.bind(this, ROW.HEADING)}
          >Heading</li>
          <li className='date'
            onClick={this.createRow.bind(this, ROW.DATE)}
          >Date</li>
        </ul>
        <ul className='invoice'>
          <li className='templates'>Templates</li>
          <li className='save' onClick={this.save}>Save</li>
          <li className='generate'>Generate</li>
        </ul>
      </header>
      /* jshint ignore: end */
    );
  },

  save: function () {
    this.props.invoice.save();
    this.props.invoice.get('rows').save();
  },

  createRow: function (type) {
    var row = new Row({ type: type });
    this.props.invoice.get('rows').add(row);
  }

});

module.exports = Header;
