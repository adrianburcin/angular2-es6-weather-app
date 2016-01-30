module.exports = function conf(env) {
  const config = require(`./${(env || 'default')}.json`);
  const defaultConfig = env ? require(`./default.json`) : {};
  return Object.assign({}, defaultConfig, config);
};
