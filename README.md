# Weather app - Angular 2 with ES6(Babel) and Gulp + Koa
## Try

###### Install
```
npm install
```

###### Run
```
npm run dev
```
starts the server and client app concurrently which will serve the client on 3000 and server on 8080

OR

```
npm start
```
to start the server which will serve also the client on port 8080


####### Run only client or server
```
npm run server
```
For preview, check localhost:8080/api/weather/Bucharest OR localhost:8080/api/cities/Bucharest
**NOTES:** starts the Koa instance. To load different environment settings for Koa middleware, set the enviornment variable KOA_ENV as 'dev' or 'prod' before executing `npm run server`

```
npm run client
```
For preview, check localhost:3000

###### Started using [Angular 2 with ES6(Babel) and Gulp boilerplate](https://github.com/adrianburcin/angular2-es6-babel-boilerplate)

####Fixing issues
As a general rule, your branch should match one issue/feature in the issues list. Please add the issue number like this #10 in your branch commit message in order to also close the issue when the branch is being approved/merged in.
