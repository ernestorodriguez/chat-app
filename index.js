import api from './api';
import server from './app/server';
import express from 'express';

const App = express();
const port = 3000;

App.use('/api/', api);
App.use('/', server);
App.use(express.static('dist'));

App.listen(port, () => console.log(`Server running on port: ${port}!`));
