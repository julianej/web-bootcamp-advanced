import { Router } from 'express';

import {
  getHomePage,
  getTrailDetail,
  getTrails,
  regionDetail,
} from '../controllers/siteController.js';

const router = Router();

// HOME
router.get(['/', '/home'], getHomePage);

// TRAILS
router.get('/trails', getTrails);
router.get('/trail/:slug', getTrailDetail);

// REGIONS
router.get('/regions/:id', regionDetail);

export default router;