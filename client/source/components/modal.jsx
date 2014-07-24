'use strict';

var _ = require('lodash');
var React = require('react');

var ModalStore = require('../stores/modal');

var getState = function () {
  return {
    display: ModalStore.get('display'),
    message: ModalStore.get('message'),
    onSuccess: ModalStore.get('onSuccess'),
    onFail: ModalStore.get('onFail')
  };
};

var Modal = React.createClass({

  getInitialState: getState,

  componentDidMount: function () {
    ModalStore.on('change', this._onChange, this);
  },

  componentWillUnmount: function () {
    ModalStore.off('change', this._onChange, this);
  },

  render: function () {
    if (! this.state.display) return null;

    return (
      /* jshint ignore: start */
      <div className='modal'>
        <p className='message'>{this.state.message}</p>
        <div className='buttons'>
          <button className='secondary' type='button' onClick={this.state.onSuccess}>
            <span className='halflings ok'>Yes</span>
          </button>
          <button className='secondary' type='button' onClick={this.state.onFail}>
            <span className='halflings remove'>No</span>
          </button>
        </div>
      </div>
      /* jshint ignore: end */
    );
  },

  _onChange: function () {
    this.setState(getState());
  }

});

module.exports = Modal;
