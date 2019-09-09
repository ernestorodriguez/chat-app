import { Router } from 'express';
import chatController from './controller';
import template from '../../components/layout';
import { renderToString } from 'react-dom/server';
const router = Router();

router.get('/:userId/:targetUserId', (req, res) => {

    const render = renderToString(chatController({
        userId: req.params.userId,
        targetUserId: req.params.targetUserId,
    }));

    res.send(template({
        body: render,
        title: 'Chat with Rob Anderson',
        pageId: 'chat',
    }));
});

export default router;
