const _ = require('lodash');
const conf = require('../../conf')();

function getFileName(searchResponse) {
  return _(searchResponse.query.pages)
    .map('images').flatten()
    .map('title')
    .filter(file => /(png|jpg)$/gi.test(file))
    .first();
}

function getFileUrl(urlResponse) {
  return _(urlResponse.query.pages)
    .map('imageinfo')
    .flatten().first().url;
}

module.exports = {
  getFileName, getFileUrl
};