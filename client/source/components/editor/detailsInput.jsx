'use strict';

var React = require('react');

var Input = require('../utils/input');

var DetailsInput = React.createClass({

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='control'>
        <label>{this.props.label}</label>
        <Input
          model={this.props.model}
          key={this.props.key}
          type={this.props.type}
        />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = DetailsInput;
