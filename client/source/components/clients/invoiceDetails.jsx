'use strict';

var React = require('react');
var moment = require('moment');
var numeral = require('numeral');

var AppStore = require('../../stores/app');
var AppActions = require('../../actions/app');

var getState = function () {
  return {
    invoice: AppStore.getActiveInvoice()
  };
};

var InvoiceDetails = React.createClass({

  componentDidMount: function () {
    if (this.state.invoice) {
      this.state.invoice.on('change', this._onChange, this);
    }
  },

  componentWillUnmount: function () {
    if (this.state.invoice) {
      this.state.invoice.off('change', this._onChange, this);
    }
  },

  getInitialState: getState,

  render: function () {
    if (! this.state.invoice) return null;

    return (
      /* jshint ignore: start */
      <div className='invoice-details'>
        <header>
          <h2>{this.state.invoice.get('number')}</h2>
          <div className='created'>
            <span className='halflings calendar' />
            {moment(this.state.invoice.get('date')).format('ddd Do MMMM YYYY')}
          </div>
          <div className='date-created'>
            <span className='halflings calendar' />
            {moment(this.state.invoice.get('dateCreated')).format('ddd Do MMMM YYYY hh:mm a')}
          </div>
          <div className='date-updated'>
            <span className='halflings calendar' />
            {moment(this.state.invoice.get('dateUpdated')).format('ddd Do MMMM YYYY hh:mm a')}
          </div>
          <div className='paid-status'>
            {
              this.state.invoice.get('paid') ? (
                <span className='halflings ok'>Paid</span>
              ) : (
                <span className='halflings remove'>Not Paid</span>
              )
            }
          </div>
          <button className='mark-paid' type='button' onClick={this.togglePaid}>
            {
              this.state.invoice.get('paid') ? (
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
            <h3>{this.state.invoice.get('customer')}</h3>
            <h5>{this.state.invoice.get('site')}</h5>
            <div className='email'>{this.state.invoice.get('email')}</div>
            <div className='labour'>Labour: {this.state.invoice.get('labour')}</div>
            <div className='airmover'>Air Mover: {this.state.invoice.get('airmover')}</div>
          </div>
          <div className='price number'>
            {numeral(this.state.invoice.get('cost')).format('$0,0.00')}
          </div>
        </div>
      </div>
      /* jshint ignore: end */
    );
  },

  togglePaid: function () {
    console.log(this.state.invoice.get('paid'));
    this.state.invoice.save({
      paid: !this.state.invoice.get('paid')
    });
  },

  destroy: function () {
    if (window.confirm('Are you sure?')) {
      this.state.invoice.destroy();
    } 
  },

  edit: function () {
    AppActions.editInvoice(this.state.invoice);
  },

  _onChange: function () {
    this.forceUpdate();
  }

});

module.exports = InvoiceDetails;
