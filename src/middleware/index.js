const koa = require('koa');
const app = koa();
const serve = require('koa-static');
const process = require('process');

const conf = require('./conf')(process.env.KOA_ENV);
const api = require('./api');

app.use(api.routes())
   .use(function *(next) {
     const start = new Date;
     yield next;
     const ms = new Date - start;
     console.log(`${this.method} ${this.url} - ${ms}ms`);
   })
   .use(serve('dist'))
   .listen(8080, () => console.log(`Koa is listening on localhost:${conf.port}`));
