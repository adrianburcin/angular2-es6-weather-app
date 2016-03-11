const request = require('request-promise');
const util = require('util');
const conf = require('../../../conf')();
const _ = require('lodash');
const wikiTransformer = require('../../transforms/wikiImages');
const weatherTransformer = require('../../transforms/weather');
const db = require('../../../store');

module.exports = function *() {

  const cityParam = this.params.city;
  const cityWikiParam = `${cityParam}:wiki`;
  const cityYahooParam = `${cityParam}:yahoo`;

  const wikipedia = _.find(conf.apis, { name: 'wikipedia' }).urls;
  const yahoo = _.find(conf.apis, { name: 'yahoo' }).urls;

  var wikiResult = yield db.readJSON(cityWikiParam);
  var yahooResult = yield db.readJSON(cityYahooParam);

  if (!wikiResult) {
    const wikiSearchResult = yield request({
      uri: util.format(`${wikipedia.base}${wikipedia.endpoints.search}`, this.params.city, 'images'),
      json: true
    });
    const wikiFileName = wikiTransformer.getFileName(wikiSearchResult);
    wikiResult = wikiTransformer.getFileUrl(yield request({
      uri: util.format(`${wikipedia.base}${wikipedia.endpoints.getImage}`, wikiFileName),
      json: true
    }));

    yield db.writeJSON(cityWikiParam, wikiResult);
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
    image: wikiResult
  };


};
