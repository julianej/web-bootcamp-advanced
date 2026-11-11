
import { Router } from 'express';

import {
  getHomePage,
  getTrailDetail,
  regionDetail,
} from '../controllers/siteController.js';

const router = Router();

// HOME
router.get('/', getHomePage);

// TRAILS
router.get('/trails/:slug', getTrailDetail);

// REGIONS
router.get('/regions/:id', regionDetail);

export default router;
