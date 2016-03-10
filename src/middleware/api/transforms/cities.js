const _ = require('lodash');

function parse(response) {
  var places = _.get(response, 'query.results.place');
  if (!_.isArray(places)) {
    places = new Array(places);
  }

  return _.reduce(places, (acc, current) => {
    acc.push({
      name: _.get(current, 'name') || '',
      country: _.get(current, 'country.content') || '',
      county: _.get(current, 'admin1.content') || ''
    });
    return acc;
  }, []);
}

module.exports = {
  parse
};
