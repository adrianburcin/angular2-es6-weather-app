const request = require('request-promise');
const util = require('util');
const conf = require('../../../conf')();
const _ = require('lodash');
const citiesTransformer = require('../../transforms/cities');
const db = require('../../../store');

module.exports = function *() {
  const cities = _.find(conf.apis, { name: 'yahoo' }).urls;
  const options = {
    uri: util.format(`${cities.base}${cities.endpoints.cities}`, this.params.city),
    json: true
  };

  var yahooResult = yield db.readJSON(this.params.city);
  
  if (!yahooResult) {
    yahooResult = citiesTransformer.parse(yield request(options));
    yield db.writeJSON(this.params.city, yahooResult);
  }

  this.body = {
    cities: yahooResult
  };
};