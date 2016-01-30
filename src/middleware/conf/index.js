module.exports = function conf(env) {
  const config = require(`./${(env || 'default')}.json`);
  return Object.assign({}, config);
};
