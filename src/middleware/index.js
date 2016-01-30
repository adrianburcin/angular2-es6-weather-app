const koa = require('koa');
const app = koa();
const serve = require('koa-static');
const process = require('process');

var conf = require('./conf')(process.env.KOA_ENV);
var api = require('./api');

app.use(api.routes())
   .use(serve('dist'))
   .listen(8080, function () {
    console.log(`Koa is listening on localhost:${conf.port}`);
});
