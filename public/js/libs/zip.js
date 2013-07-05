// Generated by CoffeeScript 1.6.3
(function() {
  var archiver, fs, walk, zipFolder;

  fs = require('fs');

  archiver = require('archiver');

  walk = function(dir, fn) {
    var results;
    results = [];
    return fs.readdir(dir, function(err, list) {
      var pending;
      if (err) {
        return fn(err);
      }
      pending = list.length;
      if (!pending) {
        return fn(null, results);
      }
      return list.forEach(function(file) {
        file = dir + '/' + file;
        return fs.stat(file, function(err, stat) {
          if (stat && stat.isDirectory()) {
            return walk(file, function(err, res) {
              results = results.concat(res);
              if (!--pending) {
                return fn(null, results);
              }
            });
          } else {
            results.push(file);
            if (!--pending) {
              return fn(null, results);
            }
          }
        });
      });
    });
  };

  zipFolder = function(input, output) {
    var archive;
    output = fs.createWriteStream(output);
    archive = archiver('zip');
    archive.on('error', function(err) {
      throw err;
    });
    archive.pipe(output);
    return walk(input, function(err, results) {
      var filename, stream, _i, _len;
      if (err) {
        throw err;
      }
      for (_i = 0, _len = results.length; _i < _len; _i++) {
        filename = results[_i];
        stream = fs.createReadStream(filename);
        archive.append(stream, {
          name: filename.slice(input.length + 1)
        });
      }
      return archive.finalize(function(err, written) {
        if (err != null) {
          throw err;
        }
      });
    });
  };

  module.exports = zipFolder;

}).call(this);