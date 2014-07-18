'use strict';

var _ = require('lodash');
var React = require('react');

var ClientEditor = React.createClass({

  getDefaultProps: function () {
    return {
      onCancel: _.noop
    };
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='editor'>
        <div className='row'>
          <label className='name'>Name</label>
          <input className='name' placeholder='Name' ref='name'
            defaultValue={this.props.client.get('name')} />
        </div>
        <div className='row'>
          <label className='address'>Address</label>
          <input className='address' placeholder='Address' ref='address'
            defaultValue={this.props.client.get('address')} />
        </div>
        <div className='row'>
          <label className='city'>City</label>
          <input className='city' placeholder='City' ref='city'
            defaultValue={this.props.client.get('city')} />
        </div>
        <div className='row'>
          <label className='postcode'>Post Code</label>
          <input className='postcode' placeholder='Post Code' ref='postcode'
            defaultValue={this.props.client.get('postcode')} />
        </div>
        <div className='buttons'>
          <button className='cancel' onClick={this.props.onFinish}>
            <span className='halflings remove' />
            Cancel
          </button>
          <button className='save' onClick={this.handleSave}>
            <span className='halflings ok' />
            Save Changes
          </button>
          <button className='destroy text' onClick={this.handleDestroy}>
            <span className='halflings trash' />
            Delete Client
          </button>
        </div>
      </div>
      /* jshint ignore: end */
    );
  },

  handleSave: function () {
    this.props.client.save({
      name: this.refs.name.getDOMNode().value,
      address: this.refs.address.getDOMNode().value,
      city: this.refs.city.getDOMNode().value,
      postcode: this.refs.postcode.getDOMNode().value
    });
    this.props.onFinish();
  },

  handleDestroy: function () {
    if (window.confirm('Are you sure?')) {
      this.props.client.destroy();
    }
  }

});

module.exports = ClientEditor;
