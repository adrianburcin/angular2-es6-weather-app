const process = require('process');

module.exports = function conf() {
  const env = process.env.KOA_ENV;
  const config = require(`./${(env || 'default')}.json`);
  const defaultConfig = env ? require(`./default.json`) : {};

  return Object.assign({}, defaultConfig, config);
};
