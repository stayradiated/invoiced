'use strict';

var React = require('react');

var Row = require('../../models/row');
var ROW = require('../../constants/row');
var InvoiceModel = require('../../models/invoice');
var AppActions = require('../../actions/app');

var Header = React.createClass({

  propTypes: {
    model: React.PropTypes.instanceOf(InvoiceModel).isRequired
  },

  render: function () {
    window.invoice = this.props.model;

    return (
      /* jshint ignore: start */
      <header>
        <ul className='rows'>
          <li onClick={this.createRow.bind(this, ROW.ITEM)}>Item</li>
          <li onClick={this.createRow.bind(this, ROW.BULLET)}>Bullet</li>
          <li onClick={this.createRow.bind(this, ROW.HEADING)}>Heading</li>
          <li onClick={this.createRow.bind(this, ROW.DATE)}>Date</li>
        </ul>
        <ul className='invoice'>
          <li onClick={this.revert}>
            <span className='halflings repeat' />
            Revert
          </li>
          <li onClick={this.save}>
            <span className='halflings floppy_disk' />
            Save
          </li>
          <li>Templates</li>
          <li>Generate</li>
        </ul>
      </header>
      /* jshint ignore: end */
    );
  },

  revert: function () {
    console.log('Reverting rows');
    this.props.model.restore();
    this.props.model.store();
    this.props.model.get('rows').restore();
    this.props.model.get('rows').store();
  },

  save: function () {
    this.props.model.get('rows').save();
  },

  createRow: function (type) {
    AppActions.createRow(this.props.model, type);
  }

});

module.exports = Header;
