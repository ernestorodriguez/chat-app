const api = require('./api');
const app = require('./app/server');
const express = require('express');

const App = express();
const port = 3000;

App.use('/api/', api);
App.use('/', app);

App.listen(port, () => console.log(`Example app listening on port ${port}!`));