'use strict';

var React = require('react');

var AppActions = require('../../actions/app');
var RowModel = require('../../models/row');

var RowDestroyBtn = React.createClass({

  propTypes: {
    model: React.PropTypes.instanceOf(RowModel).isRequired
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <button type='button' tabIndex='-1' className='primary' onClick={this.destroy}>
        <span className='halflings remove' />
      </button>
      /* jshint ignore: end */
    );
  },

  destroy: function () {
    AppActions.destroyRow(this.props.model);
  }

});

module.exports = RowDestroyBtn;
