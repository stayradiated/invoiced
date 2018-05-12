/* @flow */

const _ = require('lodash')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const zipFolder = require('./zip')
const moment = require('moment')
const open = require('opn')
const sanitize = require('sanitize-filename')
const { join } = require('path')

const config = require('../../package.json').config

/*::
type $Invoice = Object
*/

// Where template files are stored
const TEMPLATE_DIR = join(__dirname, '../../../template')

// Where unpacked docx file is stored
const DOCX_DIR = join(TEMPLATE_DIR, './template')

// Which file should be replaced
const DOCX_FILE = join(DOCX_DIR, './word/document.xml')

const templates = _.mapValues({
  document: 'document.xml.tmpl',
  bullet: 'row.bullet.xml.tmpl',
  heading: 'row.heading.xml.tmpl',
  item: 'row.item.xml.tmpl',
  subcost: 'row.subcost.xml.tmpl'
}, (value, key) => {
  const path = join(TEMPLATE_DIR, value)
  return fs.readFileSync(path, { encoding: 'utf8' })
})

const utils = {

  digits: (number /*: number */) => {
    const fixed = (Math.round(number * 100) / 100).toString()
    const sections = fixed.split('.')
    if (sections.length === 1) return fixed + '.00'
    if (sections[1].length === 1) return fixed + '0'
    if (sections[1].length === 2) return fixed
    if (sections[1].length > 2) return sections[0] + '.' + sections[1].slice(0, 1)
  },

  initial: (customer) => {
    const match = customer.match(/^[a-z]\.\s/i)
    if (match == null) {
      return ['', customer]
    }
    return [
      match[0].slice(0, -1),
      customer.slice(match[0].length)
    ]
  },

  escape: (text) => {
    return text.replace(/&(?!amp;)/g, '&amp;')
  },

  template: (template, data) => {
    const fn = (existing, field) => {
      const content = data[field]
      if (content) return utils.escape(content)
      return ''
    }
    return template.replace(/Z([\w|.]*)X/ig, fn)
  }

}

const docx = async (invoice /*: $Invoice */) => {
  let jobDate = ''
  let rowDate = ''
  let itemIndex = 0

  const filename = sanitize([
    invoice.get('number'),
    ' - ',
    invoice.get('customer'),
    ' - ',
    invoice.get('site'),
    '.docx'
  ].join(''))

  const destPath = join(__dirname, '../../', config.export, filename)

  const [rowData, client] = await Promise.all([
    invoice.related('rows').fetch(),
    invoice.related('client').fetch()
  ])

  const rows = rowData.map((row) => {
    const json = row.toJSON()

    let template = null
    switch (json.type) {
      case 1: // ITEM
        template = templates.item
        itemIndex++
        break
      case 2: // BULLET
        template = templates.bullet
        break
      case 3: // HEADING
        template = templates.heading
        json.content = json.content.toUpperCase()
        break
      case 4: // DATE
        // The first job date becomes the job date
        rowDate = moment(json.content).format('DD/MM/YYYY')
        if (!jobDate.length) jobDate = rowDate
        break
    }

    if (template) {
      const output = utils.template(template, {
        number: itemIndex.toString(),
        jobDate: rowDate,
        name: json.content,
        cost: '0'
      })
      if (json.type !== 4) rowDate = ''
      return output
    } else {
      return ''
    }
  })

  const data = {
    clientName: client.get('name').toUpperCase(),
    clientAddress: client.get('address').toUpperCase(),
    clientCity: client.get('city').toUpperCase(),
    clientPostcode: client.get('postcode').toUpperCase(),

    invoiceId: invoice.get('number').toString().toUpperCase(),
    email: invoice.get('email'),
    invoiceDate: moment(invoice.get('date')).format('DD MMMM YYYY'),
    invoiceDue: moment(invoice.get('date')).add(7, 'days').format('DD MMMM YYYY').toUpperCase(),

    rows: rows.join(''),

    jobDate: jobDate,
    jobSite: invoice.get('site').toUpperCase(),
    jobCustomer: utils.initial(invoice.get('customer'))[1].toUpperCase(),
    initial: utils.initial(invoice.get('customer'))[0].toUpperCase(),

    jobAmount: utils.digits(invoice.get('cost')),
    jobGst: utils.digits(invoice.get('cost') / 1.15 * 0.15),
    jobBeforeGst: utils.digits(invoice.get('cost') / 1.15)
  }

  // Compile document template
  const output = utils.template(templates.document, data)
  await fs.writeFileAsync(DOCX_FILE, output)

  const zipStream = zipFolder(DOCX_DIR)
  const fsStream = fs.createWriteStream(destPath)
  zipStream.pipe(fsStream)
  zipStream.on('end', () => open(destPath))

  return {
    path: destPath
  }
}

module.exports = docx
