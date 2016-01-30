const _ = require('lodash');

module.exports = {
  parse
};

function parse(response) {
  const parsedResponse = JSON.parse(response);
  return parsedResponse.photos.photo[0];
}
