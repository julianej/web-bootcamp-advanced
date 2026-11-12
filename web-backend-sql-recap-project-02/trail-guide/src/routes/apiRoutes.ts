import { Router } from 'express';

import * as apiController from '../controllers/apiController.js';

const router = Router();

// Trails
router.get('/trails', apiController.getTrails);
router.get('/trails/:slug', apiController.getTrail);

// Regions
router.get('/regions', apiController.getRegions);
router.get('/regions/:slug/trails', apiController.getRegionTrails);

export default router;
