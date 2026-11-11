import type { Request, Response } from 'express';
import * as trailModel from '../models/trailModel.js';
import { formatDate } from '../utils/formatDate.js';

// ========================================
// GET HOME PAGE
// GET /
// ========================================

export function getHomePage(
  _req: Request,
  res: Response
): void {
  const trails = trailModel.getAllTrails();

  res.render('site/home.njk', {
    title: 'Trail Guide',
    trails
  });
}

// ========================================
// GET TRAIL DETAIL
// GET /trails/:slug
// ========================================

export function getTrailDetail(
  req: Request<{ slug: string }>,
  res: Response
): void {
  const { slug } = req.params;

  const trail = trailModel.getTrailBySlug(slug);

  if (!trail) {
    res.status(404).render('errors/404.njk');
    return;
  }

  res.render('site/trail.njk', {
    title: trail.name,
    trail,
    formattedDate: formatDate(trail.created_at),
  });
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

export function getTrails(_req: Request, res: Response): void {
  const trails = trailModel.getAllTrails();

  res.render('site/trails.njk', {
    title: 'Explore Trails',
    trails,
  });
}
