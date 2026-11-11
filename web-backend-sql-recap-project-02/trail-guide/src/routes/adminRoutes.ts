
import { Router } from 'express';

import * as adminController from '../controllers/adminController.js';

const router = Router();

// ADMIN DASHBOARD
router.get('/', adminController.getAdminPage);

// CREATE TRAIL
router.get('/trails/new', adminController.getNewTrailPage);
router.post('/trails', adminController.createTrail);

// UPDATE TRAIL
router.get('/', adminController.getAdminPage);

// CREATE
router.get('/trails/new', adminController.getNewTrailPage);
router.post('/trails', adminController.createTrail);

// EDIT / UPDATE
router.get('/trails/:id/edit', adminController.getEditTrailPage);
router.post('/trails/:id', adminController.updateTrail);

// DELETE (still uses slug)
router.post('/trails/:slug/delete', adminController.deleteTrail);


export default router;
