var _ = require('lodash');
var React = require('react');

var App = require('../app');

var pages = {
  settings: {
    name: 'Settings',
    icon: 'settings'
  },
  editor: {
    name: 'Editor',
    icon: 'pen'
  },
  clients: {
    name: 'Clients',
    icon: 'group'
  },
  invoices: {
    name: 'Invoices',
    icon: 'notes'
  }
};

var Header = React.createClass({

  // setActive: function (page) {
  //   this.$('.active').removeClass('active');
  //   this.$('a.' + page).addClass('active');
  // },

  render: function () {
    return (
      /* jshint ignore: start */
      <header>
        <h1 className='logo'>
          Invoiced
          <span className='glyphicons shopping_cart' />
        </h1>
        <nav>{
          _.map(pages, function (page, id) {
            return (
              <a key={id} className={id} href={'#'+id}>
                <span className={'glyphicons ' + page.icon} />
                {page.name}
              </a>
            );
          })
        }</nav>
      </header>
      /* jshint ignore: end */
    );
  }

});

module.exports = Header;
