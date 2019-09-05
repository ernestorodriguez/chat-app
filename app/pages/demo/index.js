const router = require('express').Router();
const { render } = require('./controller');

router.get('/', render);

module.exports = router;