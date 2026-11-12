

import type { Request, Response } from 'express';

import * as regionModel from '../models/regionModel.js';
import * as trailModel from '../models/trailModel.js';

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
