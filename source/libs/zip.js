'use strict';

var EasyZip = require('easy-zip');

module.exports = function (input, output) {
  var zip = new EasyZip();
  zip.zipFolder(input, function(){
    zip.writeToFile(output);
  });
};
