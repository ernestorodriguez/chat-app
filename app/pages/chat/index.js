import { Router } from 'express';
import controller from './controller';
import template from '../../components/layout';
import { renderToString } from 'react-dom/server';

const router = Router();

router.get('/', (req, res) => {
    const render = renderToString(controller({
        user: {
            name: 'Rob Anderson',
            lastTimeActive: 'Active in the last 15m',
            avatar: 'https://placeimg.com/100/100/tech'
        },
        messages: [
            { text: 'Welcome!\nPlease let us know if you have any questions about our business solutions.', own: false },
            { text: 'Hi, I need help with the pricing', own: true },
            { text: 'Happy to help you!\n What do you like to know?', own: false },
        ],
        pageContext: {
            actionText: 'Send',
            cta: 'Type a message..'
        }
    }));

    res.send(template({
        body: render,
        title: 'Hello World from the server'
    }));
});

export default router;
