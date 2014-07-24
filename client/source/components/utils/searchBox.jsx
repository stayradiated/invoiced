'use strict';

var React = require('react');

var SearchBox = React.createClass({

  propTypes: {
    collection: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      value: ''
    };
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='search-box'>
        <span className='halflings search' />
        <input 
          onChange={this.handleChange}
          value={this.state.value}
          placeholder='Search...'
        />
      </div>
      /* jshint ignore: end */
    );
  },

  handleChange: function (event) {
    var value = event.target.value;
    this.setState({
      value: value
    });
    this.props.onChange(value);
  }

});

module.exports = SearchBox;
