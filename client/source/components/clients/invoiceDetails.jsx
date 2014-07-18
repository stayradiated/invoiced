'use strict';

var React = require('react');
var moment = require('moment');
var numeral = require('numeral');

var AppActions = require('../../actions/app');

var InvoiceDetails = React.createClass({

  componentDidMount: function () {
    this.props.invoice.on('change', this._onChange, this);
  },

  componentWillUnmount: function () {
    this.props.invoice.off('change', this._onChange, this);
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='invoice-details'>
        <header>
          <h2>{this.props.invoice.get('number')}</h2>
          <div className='created'>
            <span className='halflings calendar' />
            {moment(this.props.invoice.get('date')).format('ddd Do MMMM YYYY')}
          </div>
          <div className='date-created'>
            <span className='halflings calendar' />
            {moment(this.props.invoice.get('dateCreated')).format('ddd Do MMMM YYYY hh:mm a')}
          </div>
          <div className='date-updated'>
            <span className='halflings calendar' />
            {moment(this.props.invoice.get('dateUpdated')).format('ddd Do MMMM YYYY hh:mm a')}
          </div>
          <div className='paid-status'>
            {
              this.props.invoice.get('paid') ? (
                <span className='halflings ok'>Paid</span>
              ) : (
                <span className='halflings remove'>Not Paid</span>
              )
            }
          </div>
          <button className='mark-paid' type='button' onClick={this.togglePaid}>
            {
              this.props.invoice.get('paid') ? (
                <span className='halflings ok'>Mark as Not Paid</span>
              ) : (
                <span className='halflings ok'>Mark as Paid</span>
              )
            }
          </button>
          <button className='delete' type='button' onClick={this.destroy}>
            <span className='halflings remove'></span>
            Delete Invoice
          </button>
          <button className='edit secondary' type='button' onClick={this.edit}>
            <span className='halflings pencil'></span>
            Edit Invoice
          </button>
        </header>
        <div className='customer'>
          <div className='primary'>
            <h3>{this.props.invoice.get('customer')}</h3>
            <h5>{this.props.invoice.get('site')}</h5>
            <div className='email'>{this.props.invoice.get('email')}</div>
            <div className='labour'>Labour: {this.props.invoice.get('labour')}</div>
            <div className='airmover'>Air Mover: {this.props.invoice.get('airmover')}</div>
          </div>
          <div className='price number'>
            {numeral(this.props.invoice.get('cost')).format('$0,0.00')}
          </div>
        </div>
      </div>
      /* jshint ignore: end */
    );
  },

  togglePaid: function () {
    console.log(this.props.invoice.get('paid'));
    this.props.invoice.save({
      paid: !this.props.invoice.get('paid')
    });
  },

  destroy: function () {
    if (window.confirm('Are you sure?')) {
      this.props.invoice.destroy();
    } 
  },

  edit: function () {
    AppActions.EditInvoice(this.props.invoice);
  },

  _onChange: function () {
    this.forceUpdate();
  }

});

module.exports = InvoiceDetails;
