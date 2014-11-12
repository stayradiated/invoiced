var _ = require('lodash');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var zipFolder = require('./zip');
var moment = require('moment');
var config = require('../package').config;
var exec = require('child_process').exec;
var sanitize = require('sanitize-filename');

// Where template files are stored
var templateDir = __dirname + '/../../template/';

// Where unpacked docx file is stored
var docxDir = templateDir + 'template/';

// Which file should be replaced
var docxFile = docxDir + 'word/document.xml';

var templates = _.mapValues({
  document:  'document.xml.tmpl',
  bullet:    'row.bullet.xml.tmpl',
  heading:   'row.heading.xml.tmpl',
  item:      'row.item.xml.tmpl',
  subcost:   'row.subcost.xml.tmpl'
}, function (value, key) {
  var path = templateDir + value;
  return fs.readFileSync(path, { encoding: 'utf8' });
});

var utils = {

  digits: function (number) {
    number = (Math.round(number * 100) / 100).toString();
    var sections = number.split('.');
    if (sections.length === 1) return number + '.00';
    if (sections[1].length === 1) return number + '0';
    if (sections[1].length === 2) return number;
    if (sections[1].length >  2) return sections[0] + '.' + sections[1].slice(0,1);
  },

  initial: function (customer) {
    var match = customer.match(/^[a-z]\.\s/i);
    if (! match) match = [''];
    return [
      match[0].slice(0,-1),
      customer.slice(match[0].length)
    ];
  },

  escape: function (text) {
    return text.replace(/&(?!amp;)/g, '&amp;');
  },

  template: function (template, data) {
    var fn = function (existing, field) {
      var content = data[field];
      if (content) return utils.escape(content);
      return '';
    };
    return template.replace(/Z([\w|.]*)X/ig, fn);
  }

};

var docx = function (invoice) {

  var jobDate = '';
  var rowDate = '';
  var itemIndex = 0;

  var filename = sanitize([
    invoice.get('number'),
    ' - ',
    invoice.get('customer'),
    ' - ',
    invoice.get('site'),
    '.docx'
  ].join(''));

  var destPath = __dirname + '/../' + config.export + '/' + filename;

  return Promise.all([
    invoice.related('rows').fetch(),
    invoice.related('client').fetch()
  ])
  .then(function (results) {
    var rows = results[0];
    var client = results[1];

    rows = rows.map(function (row) {
      var template;
      var json = row.toJSON();

      switch (json.type) {
        case 1: // ITEM
          template = templates.item;
          itemIndex++;
          break;
        case 2: // BULLET
          template = templates.bullet;
          break;
        case 3: // HEADING
          template = templates.heading;
          json.content = json.content.toUpperCase();
          break;
        case 4: // DATE
          // The first job date becomes the job date
          rowDate = moment(json.content).format('DD/MM/YYYY');
          if (! jobDate.length) jobDate = rowDate;
          break;
      }


      if (template) {
        var output = utils.template(template, {
          number: itemIndex.toString(),
          jobDate: rowDate,
          name: json.content,
          cost: '0'
        });
        if (json.type !== 4) rowDate = '';
        return output;
      } else {
        return '';
      }
    });

    var data = {
      clientName: client.get('name').toUpperCase(),
      clientAddress: client.get('address').toUpperCase(),
      clientCity: client.get('city').toUpperCase(),
      clientPostcode: client.get('postcode').toUpperCase(),

      invoiceId: invoice.get('number').toString().toUpperCase(),
      email: invoice.get('email'),
      invoiceDate: moment(invoice.get('date')).format('DD MMMM YYYY'),
      invoiceDue: moment(invoice.get('date')).add('days', 7).format('DD MMMM YYYY').toUpperCase(),

      rows: rows.join(''),

      jobDate: jobDate,
      jobSite: invoice.get('site').toUpperCase(),
      jobCustomer: utils.initial(invoice.get('customer'))[1].toUpperCase(),
      initial: utils.initial(invoice.get('customer'))[0].toUpperCase(),

      jobAmount: utils.digits(invoice.get('cost')),
      jobGst: utils.digits(invoice.get('cost') / 1.15 * 0.15),
      jobBeforeGst: utils.digits(invoice.get('cost') / 1.15),
    };

    // Compile document template
    var output = utils.template(templates.document, data);

    return fs.writeFileAsync(docxFile, output);
  })
  .then(function () {
    var zipStream = zipFolder(docxDir);
    var fsStream = fs.createWriteStream(destPath);

    zipStream.on('end', function () {
      exec('open "' + destPath + '"');
    });

    zipStream.pipe(fsStream);

    return {
      path: destPath
    };
  });

};

module.exports = docx;
