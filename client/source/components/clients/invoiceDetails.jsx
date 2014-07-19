'use strict';

var React = require('react');
var moment = require('moment');
var numeral = require('numeral');

var AppActions = require('../../actions/app');
var InvoiceStore = require('../../stores/invoice');
var InvoiceModel = require('../../models/invoice');

var InvoiceDetails = React.createClass({

  componentDidMount: function () {
    this.props.model.on('change', this._onChange, this);
  },

  componentWillUnmount: function () {
    this.props.model.off('change', this._onChange, this);
  },

  propTypes: {
    model: React.PropTypes.instanceOf(InvoiceModel).isRequired
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='invoice-details'>
        <header>
          <h2>{this.props.model.get('number')}</h2>
          <div className='created'>
            <span className='halflings calendar' />
            {moment(this.props.model.get('date')).format('ddd Do MMMM YYYY')}
          </div>
          <div className='date-created'>
            <span className='halflings calendar' />
            {moment(this.props.model.get('dateCreated')).format('ddd Do MMMM YYYY hh:mm a')}
          </div>
          <div className='date-updated'>
            <span className='halflings calendar' />
            {moment(this.props.model.get('dateUpdated')).format('ddd Do MMMM YYYY hh:mm a')}
          </div>
          <div className='paid-status'>
            {
              this.props.model.get('paid') ? (
                <span className='halflings ok'>Paid</span>
              ) : (
                <span className='halflings remove'>Not Paid</span>
              )
            }
          </div>
          <button className='mark-paid' type='button' onClick={this.togglePaid}>
            {
              this.props.model.get('paid') ? (
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
            <h3>{this.props.model.get('customer')}</h3>
            <h5>{this.props.model.get('site')}</h5>
            <div className='email'>{this.props.model.get('email')}</div>
            <div className='labour'>Labour: {this.props.model.get('labour')}</div>
            <div className='airmover'>Air Mover: {this.props.model.get('airmover')}</div>
          </div>
          <div className='price number'>
            {numeral(this.props.model.get('cost')).format('$0,0.00')}
          </div>
        </div>
      </div>
      /* jshint ignore: end */
    );
  },

  togglePaid: function () {
    this.props.model.save({
      paid: !this.props.model.get('paid')
    });
  },

  destroy: function () {
    AppActions.destroyInvoice(this.props.model);
  },

  edit: function () {
    AppActions.editInvoice(this.props.model);
  },

  _onChange: function () {
    this.forceUpdate();
  }

});

module.exports = InvoiceDetails;
