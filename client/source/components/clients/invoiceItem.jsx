'use strict';

var React = require('react');
var moment = require('moment');
var numeral = require('numeral');
var classSet = require('react/addons').addons.classSet;

var InvoiceItem = React.createClass({

  componentDidMount: function () {
    this.props.invoice.on('change', this._onChange, this);
  },

  componentWillUnmount: function () {
    this.props.invoice.off('change', this._onChange, this);
  },

  render: function () {
    var classes = classSet({
      'invoice-item': true,
      'active': this.props.active
    });

    return (
      /* jshint ignore: start */
      <div className={classes} onClick={this.props.onClick}>
        <div className='meta'>
          <div className='id number'>{this.props.invoice.get('number')}</div>
          <div className='created'>
            <span className='halflings calendar' />
            {moment(this.props.invoice.get('date')).format('Do MMMM YYYY')}
          </div>
          <div className='paid-status'>
            {
              this.props.invoice.get('paid') ? (
                <span className='halflings ok paid'>Paid</span>
              ):(
                <span className='halflings remove not-paid'>Not Paid</span>
              )
            }
          </div>
        </div>
        <div className='customer'>
          <div className='primary'>
            <h3>{this.props.invoice.get('customer')}</h3>
            <h5>{this.props.invoice.get('site')}</h5>
          </div>
          <div className='price number'>
            {numeral(this.props.invoice.get('cost')).format('$0,0.00')}
          </div>
        </div>
      </div>
      /* jshint ignore: end */
    );
  },

  _onChange: function () {
    this.forceUpdate();
  }

});

module.exports = InvoiceItem;
