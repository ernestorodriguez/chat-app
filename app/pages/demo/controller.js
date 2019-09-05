const template = require('../../components/layout');
const React = require('react');
const View = require('./view')
const renderToString = require('react-dom/server');
exports.render = function render(req, res) {
    const body =  renderToString(<View />);
    res.send(template({
        body,
        title: 'Hello World from the server'
    }))
};