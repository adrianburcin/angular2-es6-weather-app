const _ = require('lodash');

function composeWeatherObject(weatherObject) {
  return _.omit(_.assign({}, weatherObject, {
    forecast: _.get(weatherObject, 'item.forecast'),
    current: _.get(weatherObject, 'item.condition')
  }), ['item']);
}

function mapUnitsOfMeasure(weatherObject) {
  const umHash = {
    visibility: 'distance',
    speed: 'speed',
    temp: 'temperature',
    high: 'temperature',
    low: 'temperature',
    pressure: 'pressure'
  };
  const um = weatherObject.units;
  function mapItemObject(objectValue) {
    const newObjectValue = _.assign({}, objectValue);
    const itemKey = _.keys(objectValue).filter((key) => _.has(umHash, key));
    if (itemKey.length) {
      _.each(itemKey, (key) => {
        newObjectValue[`um${_.capitalize(key)}`] = um[umHash[key]];
      });
    }
    return newObjectValue;
  }

  return _.assign(_.mapValues(weatherObject, mapItemObject), {
    forecast: _.map(weatherObject.forecast, mapItemObject)
  });
}

function parse(response) {
  const channel = _.get(response, 'query.results.channel');
  return _.flow(composeWeatherObject, mapUnitsOfMeasure)(
    _.pick(channel, ['location', 'units', 'wind', 'atmosphere', 'astronomy', 'item'])
  );
}

module.exports = {
  parse
};
