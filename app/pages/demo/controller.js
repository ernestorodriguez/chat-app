import template from '../../components/layout';
import React from 'react';
import View from  './view';
import { renderToString } from 'react-dom/server';
import KvsService from "../../../services/kvsService";

exports.render = function render(req, res) {
    if (!req.query.demo_messages) {
        const kvs = new KvsService();

        kvs.set({
            ['laura - rob']: [],
        });
    }

    const body =  renderToString(<View />);

    res.send(template({
        body: body,
        title: 'Demo Page Chat app',
        pageId: 'demo',
    }));
};
