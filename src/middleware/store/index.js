const database = require('levelup')('./weatherApp');
const logger = require('../logger')
const DB_NAME = 'WeatherApp';

module.exports = { read, write, readJSON, writeJSON };

function write(key, value) {
  return new Promise((resolve, reject) => {
    database.put(key, value, (err) => {
      if (err) {
        logger.error('error', `Error writing ${key}:${value} to ${DB_NAME} ${err}.`);
        reject();
      }
      
      resolve();
    });
  });
}

function read(key) {
  return new Promise((resolve, reject) => {
    database.get(key, (err, value) => {
      if (err) {
        if (err.notFound) {
          resolve(null);
        } else {
          logger.error('error', `Error reading ${key} from ${DB_NAME} ${err}.`);
          reject();
        }
      }

      resolve(value);
    });
  });
}

function writeJSON(key, value) {
  return write(key, JSON.stringify(value));
}

function readJSON(key) {
  return read(key).then(
    function parseJSONValue(value) {
      var parsedValue = null;
      try {
        parsedValue = JSON.parse(value);
      } catch (e) {}

      return parsedValue;
    });
}