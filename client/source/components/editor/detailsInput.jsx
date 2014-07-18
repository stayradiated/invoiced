'use strict';

var React = require('react');
var moment = require('moment');
var numeral = require('numeral');

var DetailsInput = React.createClass({

  componentDidMount: function () {
    this.props.invoice.on('change:' + this.props.key, this._onChange, this);
  },

  componentWillUnmount: function () {
    this.props.invoice.off('change:' + this.props.key, this._onChange, this);
  },

  getDefaultProps: function () {
    return {
      invoice: null,
      label: '',
      key: '',
      type: 'text'
    };
  },

  render: function () {

    console.log(this.props);

    var value = this.props.invoice.get(this.props.key);
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
    this.props.invoice.set(this.props.key, val);
  },

  _onChange: function () {
    this.forceUpdate();
  }

});

module.exports = DetailsInput;
