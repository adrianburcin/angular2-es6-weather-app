const _ = require('lodash');

function parse(response) {
  return _.reduce(response, (acc, current) => {
    acc.push({
      description: current.description || '',
      matchedSubstrings: current.matched_substrings || [],
      terms: current.terms || []
    });
    return acc;
  }, []);
}

module.exports = {
  parse
};
