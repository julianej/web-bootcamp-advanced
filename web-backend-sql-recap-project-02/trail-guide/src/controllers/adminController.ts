
import type { Request, Response } from 'express';

import * as trailModel from '../models/trailModel.js';
import * as regionModel from '../models/regionModel.js';

// ========================================
// FORM OPTIONS
// ========================================

const difficulties = ['easy', 'moderate', 'hard'] as const;

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

// ========================================
// GET NEW TRAIL FORM
// GET /admin/trails/new
// ========================================

export function getNewTrailPage(
  _req: Request,
  res: Response
): void {
  const regions = regionModel.getAllRegions();

  res.render('admin/form.html', {
    title: 'Add New Trail',
    regions,
    difficulties,
    trail: undefined,
    });
}

// ========================================
// CREATE TRAIL
// POST /admin/trails
// ========================================

export function createTrail(
  req: Request,
  res: Response
): void {
  const trail = trailModel.create(req.body);

  if (!trail) {
    res.status(500).send('Could not create trail.');
    return;
  }

  res.redirect('/admin');
}

// ========================================
// GET EDIT TRAIL FORM
// GET /admin/trails/:id/edit
// ========================================

export function getEditTrailPage(
  req: Request,
  res: Response
): void {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).send('Invalid trail ID.');
    return;
  }

  const trail = trailModel.getTrailById(id);

  if (!trail) {
    res.status(404).send('Trail not found.');
    return;
  }

  const regions = regionModel.getAllRegions();

  res.render('admin/form.html', {
    title: 'Edit Trail',
    regions,
    difficulties,
    trail,
  });
}

// ========================================
// UPDATE TRAIL
// POST /admin/trails/:id
// ========================================

export function updateTrail(
  req: Request,
  res: Response
): void {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).send('Invalid trail ID.');
    return;
  }

  const trail = trailModel.update(id, req.body);

  if (!trail) {
    res.status(404).send('Trail not found.');
    return;
  }

  res.redirect('/admin');
}

// ========================================
// DELETE TRAIL
// POST /admin/trails/:slug/delete
// ========================================

export function deleteTrail(
  req: Request,
  res: Response
): void {
  const { slug } = req.params;

  trailModel.deleteTrail(slug);

  res.redirect('/admin');
}
