const express = require('express');
const demo = require('./../pages/demo');

const router = express.Router();

router.get('/', (req, res) => res.send('Hello World!'));
router.use('/demo', demo);

module.exports = router;