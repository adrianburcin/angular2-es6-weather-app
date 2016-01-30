const request = require('request-promise');
const util = require('util');
const conf = require('../../../conf')();
const _ = require('lodash');
const flickrTransformer = require('../../transforms/flickrImages');
const weatherTransformer = require('../../transforms/weather');

module.exports = function *(city) {
  const images = _.find(conf.apis, { name: 'flickr' }).urls;
  const yahoo = _.find(conf.apis, { name: 'yahoo' }).urls;
  const flickrResponse = yield request(util.format(`${images.base}${images.endpoints.search}`, images.key, this.params.city));
  const yahooResponse = yield request(util.format(`${yahoo.base}${yahoo.endpoints.weather}`, this.params.city));

  this.body = {
    weather: weatherTransformer.parse(yahooResponse),
    images: flickrTransformer.parse(flickrResponse)
  };
};
