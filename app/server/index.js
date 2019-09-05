const router = require('express').Router();

router.get('/', (req, res) => res.send('Hello World!'));
router.get('/demo/', (req, res) => res.send('Hello World!'));

module.exports = router;