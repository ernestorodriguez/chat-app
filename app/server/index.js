import { Router } from 'express';
import demo from './../pages/demo';
import chat from './../pages/chat';

const router = Router();

router.use('/chat', chat);
router.use('/demo', demo);
router.get('/', (req, res) => {
    res.redirect(301, '/demo');
});

export default router;
