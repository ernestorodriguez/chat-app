import { Router } from 'express';
import chatController from './controller';
import template from '../../components/layout';
import { renderToString } from 'react-dom/server';
const router = Router();
import KvsService from '../../../services/kvsService';

const kvs = new KvsService();

router.get('/:userId/:targetUserId', (req, res) => {

    const render = renderToString(chatController({
        userId: req.params.userId,
        targetUserId: req.params.targetUserId,
        history: kvs.get('laura - rob')
    }));

    res.send(template({
        body: render,
        title: 'Chat with Rob Anderson',
        pageId: 'chat',
    }));
});

export default router;
