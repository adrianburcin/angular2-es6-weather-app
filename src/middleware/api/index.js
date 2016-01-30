const router = require('koa-router')();

router.get('/api', require('./routes'));
router.get('/api/list', require('./routes/list'));

module.exports = router;
