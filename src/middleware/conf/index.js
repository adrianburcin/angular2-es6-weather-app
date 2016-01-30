module.exports = function conf(env) {

  var conf = require(`./${env}.json`);
  var defaults = require(`./default.json`);

  return Object.assign({}, defaults, conf);
};