module.exports = {
  parse
};

function parse(response) {
 const parsedResponse = JSON.parse(response);
 return parsedResponse.query.results.channel;
}