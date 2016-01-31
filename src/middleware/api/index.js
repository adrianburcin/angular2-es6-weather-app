const router = require('koa-router')();

router.get('/api', require('./routes'));
router.get('/api/weather/:city', require('./routes/weather/get'));
router.get('/api/cities/:city', require('./routes/cities/get'));

module.exports = router;
