'use strict';

var React = require('react');
var moment = require('moment');
var numeral = require('numeral');
var classSet = require('react/addons').addons.classSet;

var AppActions = require('../../actions/app');
var InvoiceModel = require('../../models/invoice');
var InvoiceStore = require('../../stores/invoice');

var InvoiceItem = React.createClass({

  componentDidMount: function () {
    InvoiceStore.on('change:active', this.updateState, this);
    this.props.model.on('change', this._onChange, this);
  },

  componentWillUnmount: function () {
    InvoiceStore.off('change:active', this.updateState, this);
    this.props.model.off('change', this._onChange, this);
  },

  propTypes: {
    model: React.PropTypes.instanceOf(InvoiceModel).isRequired
  },

  getInitialState: function () {
    return {
      active: this.props.model === InvoiceStore.get('active')
    };
  },

  render: function () {
    var classes = classSet({
      'invoice-item': true,
      'active': this.state.active
    });

    return (
      /* jshint ignore: start */
      <div className={classes} onClick={this.openInvoice}>
        <div className='meta'>
          <div className='id number'>{
            this.props.model.get('number')
          }</div>
          <div className='created'>
            <span className='halflings calendar' />
            {
              moment(this.props.model.get('date')).format('Do MMMM YYYY')
            }
          </div>
          <div className='paid-status'>{
            this.props.model.get('paid') ? (
              <span className='halflings ok paid'>Paid</span>
            ):(
              <span className='halflings remove not-paid'>Not Paid</span>
            )
          }</div>
        </div>
        <div className='customer'>
          <div className='primary'>
            <h3>{this.props.model.get('customer')}</h3>
            <h5>{this.props.model.get('site')}</h5>
          </div>
          <div className='price number'>
            {numeral(this.props.model.get('cost')).format('$0,0.00')}
          </div>
        </div>
      </div>
      /* jshint ignore: end */
    );
  },

  openInvoice: function () {
    AppActions.openInvoice(this.props.model);
  },

  updateState: function () {
    this.setState({
      active: this.props.model === InvoiceStore.get('active')
    });
  },

  _onChange: function () {
    this.forceUpdate();
  }

});

module.exports = InvoiceItem;
