
import type { Request, Response, NextFunction } from 'express';

import * as trailModel from '../models/trailModel.js';
import * as regionModel from '../models/regionModel.js';

import type { TrailInput, Difficulty } from '../models/types.js';

import { sanitizeDescription } from '../utils/sanitizeHtml.js';
import { validateImageUrl } from '../utils/validateImgUrl.js';
import { notFoundHandler } from '../middleware/notFoundHandler.js';


// ========================================
// FORM OPTIONS
// ========================================

const difficulties: Difficulty[] = [
  'easy',
  'moderate',
  'hard',
];


// ========================================
// VALIDATE DIFFICULTY
// ========================================

function getDifficulty(value: unknown): Difficulty {
  if (
    value === 'easy' ||
    value === 'moderate' ||
    value === 'hard'
  ) {
    return value;
  }

  throw new Error('Invalid trail difficulty.');
}


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
    trails,
    regions,
  });
}


// ========================================
// GET NEW TRAIL FORM
// GET /admin/trails/new
// ========================================

export function addNewTrail(
  _req: Request,
  res: Response
): void {
  const regions = regionModel.getAllRegions();

  res.render('admin/form.njk', {
    title: 'Add New Trail',
    trail: null,
    difficulties,
    regions,
    errors: {},
  });
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
  const regions = regionModel.getAllRegions();

  if (!trail) {
    notFoundHandler(req, res);
    return;
  }

  res.render('admin/form.njk', {
    title: 'Edit Trail',
    trail,
    difficulties,
    regions,
    isEdit: true,
  });
}


// ========================================
// CREATE TRAIL
// POST /admin/trails
// ========================================

export function addTrail(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const trailData: TrailInput = {
      name: String(req.body.name ?? '').trim(),
      region_id: Number(req.body.region_id),
      description: sanitizeDescription(req.body.description ?? ''),
      distance_km: Number(req.body.distance_km),
      elevation_m: Number(req.body.elevation_m),
      difficulty: getDifficulty(req.body.difficulty),
      image: validateImageUrl(req.body.image ?? ''),
    };

    const trail = trailModel.create(trailData);

    if (!trail) {
      throw new Error('The trail could not be created.');
    }

    res.redirect('/admin');

  } catch (error) {
    next(error);
  }
}


// ========================================
// UPDATE TRAIL
// POST /admin/trails/:id
// ========================================

export function updateTrail(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).send('Invalid trail ID.');
      return;
    }

    const trailData: TrailInput = {
      name: String(req.body.name ?? '').trim(),
      region_id: Number(req.body.region_id),
      description: sanitizeDescription(req.body.description ?? ''),
      distance_km: Number(req.body.distance_km),
      elevation_m: Number(req.body.elevation_m),
      difficulty: getDifficulty(req.body.difficulty),
      image: validateImageUrl(req.body.image ?? ''),
    };

    const trail = trailModel.update(id, trailData);

    if (!trail) {
      notFoundHandler(req, res);
      return;
    }

    res.redirect('/admin');

  } catch (error) {
    next(error);
  }
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
