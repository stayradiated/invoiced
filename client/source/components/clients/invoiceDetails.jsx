'use strict';

var React = require('react');
var moment = require('moment');
var numeral = require('numeral');
window.moment = moment;

var AppActions = require('../../actions/app');
var InvoiceStore = require('../../stores/invoice');
var InvoiceModel = require('../../models/invoice');
var InvoiceRows = require('./invoiceRows');

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
    window.test = this.props.model;

    return (
      /* jshint ignore: start */
      <section className='invoice-details'>
        <header>

          <section>
            <h3>#{this.props.model.get('number')}</h3>
            <div className='date'>
              <span className='halflings calendar'>{
                moment(this.props.model.get('date')).format('dddd, Do MMMM YYYY')
              }</span>
            </div>
          </section>

          <section>
            <div className='date'>
              <label>Last Updated:</label>
              <span className='halflings pencil'>{
                moment(this.props.model.get('updatedAt')).calendar()
              }</span>
            </div>
          </section>

          <section>
            <button className='secondary' type='button' onClick={this.edit}>
              <span className='halflings pencil'>Edit Invoice</span>
            </button>
            <button type='button' onClick={this.togglePaid}>{
              this.props.model.get('paid') ? (
                <span className='halflings ok'>Unpaid</span>
              ) : (
                <span className='halflings ok'>Paid</span>
              )
            }</button>
          </section>

          <div className='customer'>
            <h2>{this.props.model.get('customer')}</h2>
            <h3>{this.props.model.get('site')}</h3>
          </div>

          <div className='email'>Email: {
            this.props.model.get('email')
          }</div>

        </header>

        <InvoiceRows collection={this.props.model.get('rows')} />

        <div className='customer'>
          <div className='primary'>
            <div className='labour'>Labour: {
              numeral(this.props.model.get('labour')).format('$0,0.00')
            }</div>
          <div className='airmover'>Air Mover: {
            numeral(this.props.model.get('airmover')).format('$0,0.00')
          }</div>
          </div>
          <div className='price number'>{
            numeral(this.props.model.get('cost')).format('$0,0.00')
          }</div>
        </div>

        <button className='text' type='button' onClick={this.destroy}>
          <span className='halflings remove'>Delete Invoice</span>
        </button>

      </section>
      /* jshint ignore: end */
    );
  },

  togglePaid: function () {
    this.props.model.save({
      paid: this.props.model.get('paid') ? 0 : 1
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
