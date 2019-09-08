import template from '../../components/layout';
import React from 'react';
import View from  './view';
import { renderToString } from 'react-dom/server';

exports.render = function render(req, res) {
    const body =  renderToString(<View />);

    res.send(template({
        body: body,
        title: 'Hello World from the server',
        pageId: 'demo',
    }));
};
