'use strict';

var React = require('react');

var InvoiceModel = require('../../models/invoice');

var TogglePaidBtn = React.createClass({

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
    var classes = this.props.model.get('paid') ? 'subtle' : 'primary';

    return (
      /* jshint ignore: start */
      <button className={classes} type='button' onClick={this.togglePaid}>{
        this.props.model.get('paid') ? (
          <span className='halflings ok'>Paid</span>
        ) : (
          <span className='halflings remove'>Unpaid</span>
        )
      }</button>
      /* jshint ignore: end */
    );
  },

  togglePaid: function () {
    this.props.model.save({
      paid: this.props.model.get('paid') ? 0 : 1
    });
  },

  _onChange: function () {
    this.forceUpdate();
  }

});

module.exports = TogglePaidBtn;
