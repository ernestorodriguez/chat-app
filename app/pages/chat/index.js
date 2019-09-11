import { Router } from 'express';
import chatController from './controller';
import template from '../../components/layout';
import { renderToString } from 'react-dom/server';
import KvsService from '../../../services/kvsService';

const router = Router();

// Dummy KVS service
const kvs = new KvsService();

router.get('/:userId/:targetUserId', (req, res) => {
    const targetUser = kvs.get('users')[req.params.targetUserId];
    const render = renderToString(chatController({
        user: kvs.get('users')[req.params.userId],
        targetUser: kvs.get('users')[req.params.targetUserId],
        history: kvs.get('laura - rob'),
    }));

    res.send(template({
        body: render,
        title: `Chat with ${targetUser.name}`,
        pageId: 'chat',
    }));
});

export default router;
