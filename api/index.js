import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.send('Hello World form Api!'));

export default router;
