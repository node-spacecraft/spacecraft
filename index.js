/*
spacecraft v1
  a basic/light node server framework
author: moonrailgun(moonrailgun@gmail.com)
*/

let Spacecraft = require('./lib/application.js');

module.exports = new Spacecraft();// globally unique
module.exports.component = require('./lib/component.js');
