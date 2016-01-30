const koa = require('koa');
const app = koa();
const serve = require('koa-static');
const conf = require('./conf')();
const api = require('./api');
const process = require('process');

app.use(api.routes())
   .use(function *(next) {
     const start = new Date;
     yield next;
     const ms = new Date - start;
     console.log(`${this.method} ${this.url} - ${ms}ms`);
   })
   .use(serve('dist'))
   .listen(process.env.PORT || conf.port /* First Heroku, then our conf */, () => console.log(`Koa is listening on localhost:${conf.port}`));
