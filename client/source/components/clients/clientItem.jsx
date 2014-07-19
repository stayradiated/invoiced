'use strict';

var React = require('react');
var classSet = require('react/addons').addons.classSet;

var AppActions = require('../../actions/app');
var ClientModel = require('../../models/client');
var ClientStore = require('../../stores/client');

var ClientItem = React.createClass({

  componentDidMount: function () {
    ClientStore.on('change:active', this.updateState, this);
    this.props.model.on('change', this._onChange, this);
    this.props.model.get('invoices').on('add remove', this._onChange, this);
  },

  componentWillUnmount: function () {
    ClientStore.off('change:active', this.updateState, this);
    this.props.model.off('change', this._onChange, this);
    this.props.model.get('invoices').off('add remove', this._onChange, this);
  },

  propTypes: {
    model: React.PropTypes.instanceOf(ClientModel).isRequired
  },

  getInitialState: function () {
    return {
      active: this.props.model === ClientStore.get('active')
    };
  },

  render: function () {
    var classes = classSet({
      'client-item': true,
      'active': this.state.active
    });

    return (
      /* jshint ignore: start */
      <div className={classes} onClick={this.open} >
        <div className='details'>
          <h3>{
            this.props.model.get('name')
          }</h3>
          <p>
            <span className='address'>{
              this.props.model.get('address')
            }</span>
            <span className='city'>{
              this.props.model.get('city')
            }</span>
            <span className='postcode'>{
              this.props.model.get('postcode')
            }</span>
          </p>
        </div>
        <div className='invoices-count number'>{
          this.props.model.get('invoices').length
        }</div>
      </div>
      /* jshint ignore: end */
    );
  },

  open: function () {
    AppActions.openClient(this.props.model);
  },

  updateState: function () {
    this.setState({
      active: this.props.model === ClientStore.get('active')
    });
  },

  _onChange: function () {
    this.forceUpdate();
  }

});

module.exports = ClientItem;
