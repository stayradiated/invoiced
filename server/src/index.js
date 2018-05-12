/* @flow */

const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const { join } = require('path')

const CLIENT_PATH = join(__dirname, '../../client2/dist')

const app = express()

app.use(cors({
  methods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
}))
app.use(express.static(CLIENT_PATH))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./routes/clients').listen(app)
require('./routes/invoices').listen(app)
require('./routes/rows').listen(app)
require('./routes/snippets').listen(app)

app.listen(8080)

module.exports = app
