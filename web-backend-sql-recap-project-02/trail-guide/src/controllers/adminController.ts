// src/controllers/adminController.ts

import type { Request, Response } from 'express';

import * as trailModel from '../models/trailModel.js';
import * as regionModel from '../models/regionModel.js';

// ========================================
// GET ADMIN DASHBOARD
// GET /admin
// ========================================

export function getAdminPage(
  _req: Request,
  res: Response
): void {
  const trails = trailModel.getAllTrails();
  const regions = regionModel.getAllRegions();

res.render('admin/dashboard', {
    title: 'Manage Trails',
    regions,
    trails,
 });
}

export function deleteTrail(
  req: Request,
  res: Response
): void {
  const { slug } = req.params;

  trailModel.deleteTrail(slug);

  res.redirect('/admin');
}