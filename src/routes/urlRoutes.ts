import { Router } from 'express';
import { createShortUrl } from '../controllers/urlController';
import { trackClicks } from '../middleware/trackClicks';
import { fetchLinkHistory } from '../controllers/linkHistoryController';

const router = Router();

router.post('/shorten', createShortUrl);
router.get('/:urlCode', trackClicks);
router.get('/history/:userId', fetchLinkHistory);

export default router;
