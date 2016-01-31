const request = require('request-promise');
const util = require('util');
const conf = require('../../../conf')();
const _ = require('lodash');
const flickrTransformer = require('../../transforms/flickrImages');
const weatherTransformer = require('../../transforms/weather');

module.exports = function *() {
  const images = _.find(conf.apis, { name: 'flickr' }).urls;
  const yahoo = _.find(conf.apis, { name: 'yahoo' }).urls;
  const flickrResponse = yield request({
    uri: util.format(`${images.base}${images.endpoints.search}`, images.key, this.params.city),
    json: true
  });
  const yahooResponse = yield request({
    uri: util.format(`${yahoo.base}${yahoo.endpoints.weather}`, this.params.city),
    json: true
  });

  this.body = {
    weather: weatherTransformer.parse(yahooResponse),
    images: flickrTransformer.parse(flickrResponse)
  };
};
