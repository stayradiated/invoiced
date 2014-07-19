'use strict';

var _ = require('lodash');
var React = require('react');

var AppActions = require('../../actions/app');
var ClientStore = require('../../stores/client');
var ClientModel = require('../../models/client');

var getState = function () {
  return {
    showEditor: ClientStore.get('editMode')
  };
};

var ClientEditor = React.createClass({

  getInitialState: getState,

  componentDidMount: function () {
    ClientStore.on('change:editMode', this._onChange, this);
  },

  componentWillUnmount: function () {
    ClientStore.off('change:editMode', this._onChange, this);
  },

  propTypes: {
    model: React.PropTypes.instanceOf(ClientModel).isRequired
  },

  render: function () {
    if (! this.state.showEditor) return null;

    return (
      /* jshint ignore: start */
      <div className='editor'>
        <div className='row'>
          <label>Name</label>
          <input placeholder='Name' ref='name'
            defaultValue={this.props.model.get('name')} />
        </div>
        <div className='row'>
          <label>Address</label>
          <input placeholder='Address' ref='address'
            defaultValue={this.props.model.get('address')} />
        </div>
        <div className='row'>
          <label>City</label>
          <input placeholder='City' ref='city'
            defaultValue={this.props.model.get('city')} />
        </div>
        <div className='row'>
          <label>Post Code</label>
          <input placeholder='Post Code' ref='postcode'
            defaultValue={this.props.model.get('postcode')} />
        </div>
        <div className='buttons'>
          <button onClick={this.hide}>
            <span className='halflings remove' />
            Cancel
          </button>
          <button onClick={this.save}>
            <span className='halflings ok' />
            Save Changes
          </button>
          <button className='text' onClick={this.destroy}>
            <span className='halflings trash' />
            Delete Client
          </button>
        </div>
      </div>
      /* jshint ignore: end */
    );
  },

  hide: function () {
    AppActions.openClient(this.props.model);
  },

  save: function () {
    this.props.model.save({
      name: this.refs.name.getDOMNode().value,
      address: this.refs.address.getDOMNode().value,
      city: this.refs.city.getDOMNode().value,
      postcode: this.refs.postcode.getDOMNode().value
    });
    this.hide();
  },

  destroy: function () {
    AppActions.destroyClient(this.props.model);
  },

  _onChange: function () {
    this.setState(getState());
  }

});

module.exports = ClientEditor;
