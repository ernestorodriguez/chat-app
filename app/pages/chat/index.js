import { Router } from 'express';
import controller from './controller';
import template from '../../components/layout';
import { renderToString } from 'react-dom/server';

const router = Router();

router.get('/:userId/', (req, res) => {
    const render = renderToString(controller({
        user: {
            name: 'Rob Anderson',
            lastTimeActive: 'Active in the last 15m',
            avatar: 'https://placeimg.com/100/100/tech'
        },
        messages: [
            { text: 'September 9', type: 'system' },
            { text: 'Welcome!\nPlease let us know if you have any questions about our business solutions.', type: 'theirs' },
            { text: 'September 10', type: 'system' },
            { text: 'Hi, I need help with the pricing', type: 'my' },
            { text: 'Happy to help you!\n What do you like to know?', type: 'theirs' },
            { text: 'I would like to know how I have to spent in this, can you guide me through this?', type: 'my' },
            { text: 'Just now. Seen', type: 'status' },
        ],
        pageContext: {
            cta: 'Type a message...'
        }
    }));

    res.send(template({
        body: render,
        title: 'Chat with Rob Anderson',
        pageId: 'chat',
    }));
});

export default router;
