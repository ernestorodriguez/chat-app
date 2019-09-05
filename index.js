const express = require('express');
const server = require('./app/server');
const api = require('./api');

const App = express();
const port = 3000;

App.use('/api/', api);
App.use('/', server);

App.listen(port, () => console.log(`Server running on port: ${port}!`));