module.exports = function conf(env) {

  env = env || 'default';

  var conf = require(`./${env}.json`);

  return Object.assign({}, conf);
};