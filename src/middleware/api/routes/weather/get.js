const request = require('request-promise');
const util = require('util');
const conf = require('../../../conf')();
const _ = require('lodash');
const flickrTransformer = require('../../transforms/flickrImages');
const weatherTransformer = require('../../transforms/weather');
const db = require('../../../store');

module.exports = function *() {

  const cityParam = this.params.city;
  const cityFlickrParam = `${cityParam}:flickr`;
  const cityYahooParam = `${cityParam}:yahoo`;

  const images = _.find(conf.apis, { name: 'flickr' }).urls;
  const yahoo = _.find(conf.apis, { name: 'yahoo' }).urls;

  var flickrResult = yield db.readJSON(cityFlickrParam);
  var yahooResult = yield db.readJSON(cityYahooParam);

  if (!flickrResult) {
    flickrResult = flickrTransformer.parse(yield request({
      uri: util.format(`${images.base}${images.endpoints.search}`, images.key, this.params.city),
      json: true
    }));
    yield db.writeJSON(cityFlickrParam, flickrResult);
  }

  if (!yahooResult) {
    yahooResult = weatherTransformer.parse(yield request({
      uri: util.format(`${yahoo.base}${yahoo.endpoints.weather}`, this.params.city),
      json: true
    }));
    yield db.writeJSON(cityYahooParam, yahooResult);
  }

  this.body = {
    weather: yahooResult,
    images: flickrResult
  };
};
