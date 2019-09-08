import { Router } from 'express';
import demo from './../pages/demo';
import chat from './../pages/chat';

const router = Router();

router.use('/demo', demo);
router.use('/chat', chat);

export default router;
