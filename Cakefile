{exec, spawn} = require 'child_process'

# Configuration
input = 'source/'
output = 'public/js/'

option '-w', '--watch', 'Watch the folder for changes'

task 'build', 'Build coffeescript files', (options) ->
  
  # Modules
  cmd = 'coffee'

  # Arguments
  args = ['-c', '-o', output, input]
  
  # Build or Watch
  if options.watch
    args.unshift('-w')

  console.log cmd, args.join(' ')

  # Start browserify
  terminal = spawn(cmd, args)
  terminal.stdout.on 'data', (data) -> console.log(data.toString())
  terminal.stderr.on 'data', (data) -> console.log(data.toString())


task 'package_win', 'Package application (for Windows)', ->

  base = '~/Applications/node-webkit-win/'
  nw = base + 'nw.exe'
  zip = base + 'app.nw'
  out = base + 'invoicer.exe'

  console.log 'Packing files'
  exec "zip -r #{zip} *", ->
    console.log 'Merging with node-webkit'
    exec "cat #{nw} + #{zip} > #{out}", ->
      console.log 'Built to', out

task 'package_mac', 'Package application (for Mac)', ->

  app = '~/Applications/node-webkit.app'
  filename = 'invoicer.app'
  out = "#{filename}/Contents/Resources/app.nw"

  exec "cp -r #{app} #{filename}"
  exec "mkdir -p #{out}"
  exec "cp -r public source template node_modules package.json #{out}"
