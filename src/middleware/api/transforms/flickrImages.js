const _ = require('lodash');
const conf = require('../../conf')();
const util = require('util');

const PREFERRED_PHOTO_SIZE = 'm';

// Implementation details: https://www.flickr.com/services/api/misc.urls.html
function composeImageUrl(flickrPhotoObject) {
  if (!flickrPhotoObject) {
    return null;
  }
  const photo = flickrPhotoObject;
  const photoUrl = _.find(conf.apis, { name: 'flickr' }).urls.photo_url;
  return util.format(photoUrl, photo.farm, photo.server, photo.id,
      photo.secret, PREFERRED_PHOTO_SIZE);
}

function parse(response) {
  return { imageUrl: composeImageUrl(_.get(response, 'photos.photo[0]')) };
}

module.exports = {
  parse
};
