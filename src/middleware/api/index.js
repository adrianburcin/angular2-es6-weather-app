const router = require('koa-router')();

router.get('/api', require('./routes'));
router.get('/api/weather/:city', require('./routes/weather/get'));

module.exports = router;
