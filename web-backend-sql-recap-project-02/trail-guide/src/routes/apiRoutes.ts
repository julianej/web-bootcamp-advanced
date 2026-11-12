
import { Router } from 'express';

import * as apiController from '../controllers/apiController.js';
import { apiKeyAuth } from '../middleware/requireApiKey.js';

const router = Router();

// ========================================
// PUBLIC READ ROUTES
// ========================================

router.get('/trails', apiController.getTrails);
router.get('/trails/:slug', apiController.getTrail);

router.get('/regions', apiController.getRegions);
router.get('/regions/:slug/trails', apiController.getRegionTrails);


// ========================================
// PROTECTED WRITE ROUTES
// ========================================

router.post('/trails', apiKeyAuth, apiController.createTrail);
router.put('/trails/:id', apiKeyAuth, apiController.updateTrail);
router.delete('/trails/:id', apiKeyAuth, apiController.deleteTrail);

export default router;
