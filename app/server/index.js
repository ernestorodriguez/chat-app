const router = require('express').Router();
const demo = require('./../pages/demo');

router.get('/', (req, res) => res.send('Hello World!'));
router.use('/demo', demo);

module.exports = router;