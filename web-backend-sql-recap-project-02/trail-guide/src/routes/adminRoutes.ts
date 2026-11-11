import { Router } from 'express';

import * as adminController from '../controllers/adminController.js';

const router = Router();

router.get('/', adminController.getAdminPage);


// router.get('/trails/new', adminController.getNewTrailPage);
// router.post('/trails', adminController.createTrail);

// router.get('/trails/:slug/edit', adminController.getEditTrailPage);
// router.post('/trails/:slug', adminController.updateTrail);

router.post('/trails/:slug/delete', adminController.deleteTrail);
// router.post('/trails/:slug/delete', adminController.deleteTrail);

export default router;