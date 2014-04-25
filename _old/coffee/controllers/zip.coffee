fs       = require 'fs'
archiver = require 'archiver'

IGNORE = ['.DS_Store']

# Walk through a folder and list all the files it can find
_walk = (dir, fn) ->
  results = []
  fs.readdir dir, (err, list) ->
    if err then return fn(err)
    pending = list.length
    if not pending then return fn(null, results)
    list.forEach (file) ->
      if IGNORE.indexOf(file) >= 0
        --pending
      else
        file = dir + '/' + file
        fs.stat file, (err, stat) ->
          if stat and stat.isDirectory()
            _walk file, (err, res) ->
              results = results.concat(res)
              if not --pending then fn(null, results)
          else
            results.push(file)
            if not --pending then fn(null, results)

cache = {}

# Memoize pattern
walk = (dir, fn) ->
  if cache.hasOwnProperty(dir)
    fn(null, cache[dir])
  else
    _walk dir, (err, results) ->
      if err then return fn(err)
      cache[dir] = results
      fn(null, results)

zipFolder = (input, output) ->

  output = fs.createWriteStream output
  archive = archiver('zip')
  archive.on('error', (err) -> throw err)
  archive.pipe(output)

  walk input, (err, results) ->
    if err then throw err

    for filename in results
      stream = fs.createReadStream(filename)
      archive.append(stream, name: filename[input.length + 1..])

    archive.finalize (err, written) ->
      if err? then throw err

module.exports = zipFolder
