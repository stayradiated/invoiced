mysql = require 'mysql'

connection = mysql.createConnection
  host: '127.0.0.1'
  port: 8889
  user: 'nodejs'
  password: 'nodejs'
  database: '13_7106_george'

connection.connect()

connection.query 'SELECT * FROM users', (err, rows, fields) ->
  if err then throw err
  console.log rows
