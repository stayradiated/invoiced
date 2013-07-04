{spawn, exec} = require 'child_process'
node_static = require 'node-static'
http = require 'http'
fs = require 'fs'

# Configuration
input = 'source/main.coffee'
output = 'js/main.js'
serverFolder = '.'

option '-p', '--port [port]', 'Set port for cake server'
option '-w', '--watch', 'Watch the folder for changes'

task 'server', 'Start server', (options) ->

  # Set port
  port = options.port or 9294
  
  # Modules
  watchify = './node_modules/watchify/bin/cmd.js'
  browserify = './node_modules/browserify/bin/cmd.js'
  coffeeify = './node_modules/caching-coffeeify/index.js'

  args = ['-v', '-t', coffeeify, input, '-o', output]
  
  # Start browserify
  terminal = spawn(watchify, args)
  terminal.stdout.on 'data', (data) -> console.log(data.toString())
  terminal.stderr.on 'data', (data) -> console.log(data.toString())
  terminal.on 'error', (data) -> console.log('Error', data.toString())
  terminal.on 'close', (data) -> console.log('Closing', data.toString())
  
  # Run http server on localhost:9294
  file= new(node_static.Server)(serverFolder)

  server = http.createServer (req, res) ->

    req.addListener( 'end', ->
      file.serve(req, res)
    ).resume()

  server.listen port

  console.log 'Server started on ' + port


task 'build', 'Start server', (options) ->
  
  # Modules
  watchify = './node_modules/watchify/bin/cmd.js'
  browserify = './node_modules/browserify/bin/cmd.js'
  coffeeify = './node_modules/caching-coffeeify/index.js'

  # Arguments
  args = ['-t', coffeeify, input, '-o', output]
  
  # Build or Watch
  if options.watch
    cmd = watchify
  else
    cmd = browserify

  console.log cmd, args.join(' ')
  
  # Start browserify
  terminal = spawn(cmd, args)
  terminal.stdout.on 'data', (data) -> console.log(data.toString())
  terminal.stderr.on 'data', (data) -> console.log(data.toString())


task 'minify', 'Minify application.js', ->

  uglify = './node_modules/uglify-js/bin/uglifyjs'

  # Config
  input = './application/application.js'
  output = './application.min.js'

  command = "#{ uglify } #{ input } -c -m -o #{ output }"

  exec command, (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr
