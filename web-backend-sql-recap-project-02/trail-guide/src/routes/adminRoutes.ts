
import { Router } from 'express';

import * as adminController from '../controllers/adminController.js';

const router = Router();

// ADMIN DASHBOARD
router.get('/', adminController.getAdminPage);

// CREATE TRAIL for HTTP route
router.get('/trails/new', adminController.addNewTrail);
router.post('/trails', adminController.addTrail);

// UPDATE TRAIL
router.get('/admin', adminController.getAdminPage);

// EDIT / UPDATE
router.get('/trails/:id/edit', adminController.getEditTrailPage);
router.post('/trails/:id', adminController.updateTrail);

// DELETE (still uses slug)
router.post('/trails/:slug/delete', adminController.deleteTrail);


export default router;
