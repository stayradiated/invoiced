/* @flow */

const { relative } = require('path')
const archiver = require('archiver')
const readdir = require('recursive-readdir')

const zip = (folder /*: string */) => {
  const zip = archiver.create('zip')
  zip.on('error', console.error)

  readdir(folder, (err, files) => {
    if (err) {
      return console.error(err)
    }

    files.forEach((file) => {
      zip.file(file, {
        name: relative(folder, file)
      })
    })

    zip.finalize()
  })

  return zip
}

module.exports = zip
