{spawn} = require 'child_process'

# Configuration
input = 'source/'
output = 'public/js/'

option '-w', '--watch', 'Watch the folder for changes'

task 'build', 'Start server', (options) ->
  
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

