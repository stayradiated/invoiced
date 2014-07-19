'use strict';

var React = require('react');
var moment = require('moment');
var numeral = require('numeral');

var InvoiceModel = require('../../models/invoice');

var DetailsInput = React.createClass({

  componentDidMount: function () {
    this.props.model.on('change:' + this.props.key, this._onChange, this);
  },

  componentWillUnmount: function () {
    this.props.model.off('change:' + this.props.key, this._onChange, this);
  },

  propTypes: {
    model: React.PropTypes.instanceOf(InvoiceModel),
    label: React.PropTypes.string,
    key: React.PropTypes.string,
    type: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      type: 'text'
    };
  },

  render: function () {
    var value = this.props.model.get(this.props.key);
    var type = this.props.type;

    switch (type) {
      case 'date':
        value = moment(value).format('YYYY-MM-DD');
        break;
      case 'currency':
        type = 'number';
        value = numeral(value).format('0.00');
        break;
    }

    return (
      /* jshint ignore: start */
      <div className='control'>
        <label>{this.props.label}</label>
        <input
          ref='input'
          type={type}
          onChange={this.handleChange}
          value={value}
        />
      </div>
      /* jshint ignore: end */
    );
  },

  handleChange: function () {
    var val = this.refs.input.getDOMNode().value;
    this.props.model.set(this.props.key, val);
  },

  _onChange: function () {
    this.forceUpdate();
  }

});

module.exports = DetailsInput;
