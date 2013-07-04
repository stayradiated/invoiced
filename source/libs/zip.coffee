fs       = require 'fs'
archiver = require 'archiver'

# Walk through a folder and list all the files it can find
walk = (dir, fn) ->
  results = []
  fs.readdir dir, (err, list) ->
    if err then return fn(err)
    pending = list.length
    if not pending then return fn(null, results)
    list.forEach (file) ->
      file = dir + '/' + file
      fs.stat file, (err, stat) ->
        if stat and stat.isDirectory()
          walk file, (err, res) ->
            results = results.concat(res)
            if not --pending then fn(null, results)
        else
          results.push(file)
          if not --pending then fn(null, results)

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
