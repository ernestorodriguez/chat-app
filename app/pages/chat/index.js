import { Router } from 'express';
import controller from './controller';
import template from '../../components/layout';
import { renderToString } from 'react-dom/server';

const router = Router();

router.get('/', (req, res) => {
    const render = renderToString(controller({
        foo: 'bar',
    }));

    res.send(template({
        body: render,
        title: 'Hello World from the server'
    }));
});

export default router;
