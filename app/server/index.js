import { Router } from 'express';
import demo from './../pages/demo';

const router = Router();


router.get('/', (req, res) => res.send('Hello World!'));
router.use('/demo', demo);

export default router;
