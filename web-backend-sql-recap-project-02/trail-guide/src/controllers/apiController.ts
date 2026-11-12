

import type { Request, Response } from 'express';

import * as regionModel from '../models/regionModel.js';
import * as trailModel from '../models/trailModel.js';

import { validateTrailInput } from '../utils/validateInput.js';
import type { TrailInput } from '../models/types.js';


// GET /api/trails
export function getTrails(
  _req: Request,
  res: Response
): void {
  const trails = trailModel.getAllTrails();

  res.json(trails);
}

// GET /api/trails/:slug
export function getTrail(
  req: Request<{ slug: string }>,
  res: Response
): void {
  const trail = trailModel.getTrailBySlug(req.params.slug);

  if (!trail) {
    res.status(404).json({
      error: 'Trail not found.'
    });
    return;
  }

  res.json(trail);
}


// GET /api/regions
export function getRegions(
  _req: Request,
  res: Response
): void {
  const regions = regionModel.getAllRegions();

  res.json(regions);
}

// GET /api/regions/:slug/trails
export function getRegionTrails(
  req: Request<{ slug: string }>,
  res: Response
): void {
  const region = regionModel.getRegionBySlug(req.params.slug);

  if (!region) {
    res.status(404).json({
      error: 'Region not found.'
    });
    return;
  }

  const trails = trailModel.getByRegion(region.id);

  res.json(trails);
}


// ========================================
// POST /api/trails
// CREATE TRAIL
// ========================================

export function createTrail(
  req: Request,
  res: Response
): void {
  const validationError = validateTrailInput(req.body);

  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  const input = req.body as TrailInput;

  const region = regionModel
    .getAllRegions()
    .find((item) => item.id === input.region_id);

  if (!region) {
    res.status(400).json({
      error: 'Invalid region_id. Region does not exist.',
    });
    return;
  }

  const trail = trailModel.create(input);

  if (!trail) {
    res.status(500).json({
      error: 'Could not create trail.',
    });
    return;
  }

  res.status(201).json(trail);
}


// ========================================
// PUT /api/trails/:id
// UPDATE TRAIL
// ========================================

export function updateTrail(
  req: Request<{ id: string }>,
  res: Response
): void {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(404).json({
      error: 'Trail not found.',
    });
    return;
  }

  const existingTrail = trailModel
    .getAllTrails()
    .find((trail) => trail.id === id);

  if (!existingTrail) {
    res.status(404).json({
      error: 'Trail not found.',
    });
    return;
  }

  // PUT VALIDATION
  const validationError = validateTrailInput(req.body);

  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  const input = req.body as TrailInput;

  const region = regionModel
    .getAllRegions()
    .find((item) => item.id === input.region_id);

  if (!region) {
    res.status(400).json({
      error: 'Invalid region_id. Region does not exist.',
    });
    return;
  }

  const updatedTrail = trailModel.update(id, input);

  if (!updatedTrail) {
    res.status(404).json({
      error: 'Trail not found.',
    });
    return;
  }

  res.status(200).json(updatedTrail);
}


// ========================================
// DELETE /api/trails/:id
// DELETE TRAIL
// ========================================

export function deleteTrail(
  req: Request<{ id: string }>,
  res: Response
): void {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(404).json({
      error: 'Trail not found.',
    });
    return;
  }

  const existingTrail = trailModel
    .getAllTrails()
    .find((trail) => trail.id === id);

  if (!existingTrail) {
    res.status(404).json({
      error: 'Trail not found.',
    });
    return;
  }

  trailModel.deleteTrailById(id);

  res.status(204).send();
}
