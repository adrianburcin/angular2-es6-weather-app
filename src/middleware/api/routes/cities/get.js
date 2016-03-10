const request = require('request-promise');
const util = require('util');
const conf = require('../../../conf')();
const _ = require('lodash');
const citiesTransformer = require('../../transforms/cities');
const db = require('../../../store');

module.exports = function *() {
  const cities = _.find(conf.apis, { name: 'google' }).urls;
  const options = {
    uri: util.format(`${cities.base}${cities.endpoints.cities}`, this.params.city, cities.key),
    json: true
  };

  var googleResult = yield db.readJSON(this.params.city);
  
  if (!googleResult) {
    googleResult = citiesTransformer.parse((yield request(options)).predictions);
    yield db.writeJSON(this.params.city, googleResult);
  }

  this.body = {
    cities: googleResult
  };
};