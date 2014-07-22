'use strict';

var React = require('react');
var moment = require('moment');
var numeral = require('numeral');

var Input = React.createClass({

  componentDidMount: function () {
    this.props.model.on('change:' + this.props.key, this._onChange, this);
  },

  componentWillUnmount: function () {
    this.props.model.off('change:' + this.props.key, this._onChange, this);
  },

  propTypes: {
    model: React.PropTypes.object,
    key: React.PropTypes.string,
    type: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      type: 'text'
    };
  },

  getInitialState: function () {
    return {
      value: this.props.model.get(this.props.key)
    };
  },

  render: function () {
    var value = this.state.value;
    var type = this.props.type;

    switch (type) {
      case 'date':
        value = moment(value).format('YYYY-MM-DD');
        break;
    }

    return (
      /* jshint ignore: start */
      <input
        ref='input'
        type={type}
        value={value}
        onBlur={this.save}
        onChange={this.handleChange}
      />
      /* jshint ignore: end */
    );
  },

  save: function () {
    this.props.model.set(this.props.key, this.state.value);
    if (this.props.model.hasChanged()) {
      this.props.model.save();
    }
  },

  handleChange: function (event) {
    this.setState({
      value: event.target.value
    });
  },

  _onChange: function () {
    this.setState({
      value: this.props.model.get(this.props.key)
    });
  }

});

module.exports = Input;
