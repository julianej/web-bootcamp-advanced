
import type { Request, Response } from 'express';

import * as regionModel from '../models/regionModel.js';
import * as trailModel from '../models/trailModel.js';

// ========================================
// HELPERS
// ========================================

// Convert and validate URL parameters
function parseId(value: string | string[] | undefined): number | null {
  if (typeof value !== 'string') {
    return null;
  }

  const id = Number(value);

  return Number.isInteger(id) && id > 0 ? id : null;
}

// Render 404 page
function notFound(res: Response): void {
  res.status(404).render('errors/404');
}

// ========================================
// HOME
// GET /
// ========================================

export function home(_req: Request, res: Response): void {
  const trails = trailModel.getAllWithRegion();

  console.log('Homepage trails:', trails);

  res.render('site/home.njk', {
    title: 'Trail Guide',
    trails,
  });
}

// ========================================
// TRAIL LIST
// GET /trails
// ========================================

export function trailList(_req: Request, res: Response): void {
  const trails = trailModel.getAllWithRegion();
  console.log(trails);
  res.render('site/trails', { trails });
}

// ========================================
// TRAIL DETAIL
// GET /trails/:id
// ========================================

export function trailDetail(req: Request, res: Response): void {
  const id = parseId(req.params.id);
  const trail = id === null ? undefined : trailModel.getById(id);

  if (!trail) {
    notFound(res);
    return;
  }

  res.render('site/trail', { trail });
}

// ========================================
// REGION DETAIL
// GET /regions/:id
// ========================================

export function regionDetail(req: Request, res: Response): void {
  const id = parseId(req.params.id);
  const region = id === null ? undefined : regionModel.getById(id);

  if (!region) {
    notFound(res);
    return;
  }

  const trails = trailModel.getByRegion(region.id);

  res.render('site/region', {
    region,
    trails,
  });
}
