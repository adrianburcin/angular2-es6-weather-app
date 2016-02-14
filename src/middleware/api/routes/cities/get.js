const request = require('request-promise');
const util = require('util');
const conf = require('../../../conf')();
const _ = require('lodash');
const citiesTransformer = require('../../transforms/cities');

module.exports = function *() {
  const cities = _.find(conf.apis, { name: 'yahoo' }).urls;
  const options = {
    uri: util.format(`${cities.base}${cities.endpoints.cities}`, this.params.city),
    json: true
  };

  const yahooResponse = yield request(options);

  this.body = {
    cities: citiesTransformer.parse(yahooResponse)
  };
};