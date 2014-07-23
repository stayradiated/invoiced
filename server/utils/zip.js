var Path = require('path');
var archiver = require('archiver');
var readdir = require('recursive-readdir');

module.exports = function (folder) {
  var zip = archiver.create('zip');
  zip.on('error', console.log.bind(console));

  readdir(folder, function (err, files) {
    if (err) {
      return console.log(err);
    }

    files.forEach(function (file) {
      zip.file(file, {
        name: Path.relative(folder, file)
      });
    });

    zip.finalize();
  });

  return zip;
};
