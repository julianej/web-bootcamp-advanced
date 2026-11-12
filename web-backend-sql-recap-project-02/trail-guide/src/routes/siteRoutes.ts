import { Router } from 'express';

import {
  getHomePage,
  getTrails,
  getTrailDetail,
  getRegions,
  regionDetail,
} from '../controllers/siteController.js';

const router = Router();

// HOME
router.get(['/', '/home'], getHomePage);

// TRAILS
router.get('/trails', getTrails);

router.get('/trail/:slug', getTrailDetail);

// REGIONS
router.get('/regions', getRegions);
router.get('/region/:slug', regionDetail);

export default router;