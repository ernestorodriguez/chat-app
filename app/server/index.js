import { Router } from 'express';
import demo from './../pages/demo';
import chat from './../pages/chat';

const router = Router();


router.get('/', chat);
router.use('/demo', demo);

export default router;
