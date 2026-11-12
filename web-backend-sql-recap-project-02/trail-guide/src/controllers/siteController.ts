
import type { Request, Response } from 'express';

import * as trailModel from '../models/trailModel.js';
import * as regionModel from '../models/regionModel.js';

import { formatDate } from '../utils/formatDate.js';


// ========================================
// GET HOME PAGE
// GET /
// ========================================
export function getHomePage(
  _req: Request,
  res: Response
): void {

  const trails = trailModel.getAllTrails().slice(0, 3);
  const regions = regionModel.getAllRegions();

  res.render('site/home.njk', {
    title: 'Trail Guide',
    trails,
    regions,
    showFilters: true
  });
}

// ========================================
// GET ALL TRAILS / SEARCH
// GET /trails
// ========================================

export function getTrailsPage(req: Request, res: Response): void {
  // type guards before passing query parameters to your model
    const q = typeof req.query.q === 'string'
    ? req.query.q
    : '';

  const region = typeof req.query.region === 'string'
    ? req.query.region
    : '';

  const difficulty = typeof req.query.difficulty === 'string'
    ? req.query.difficulty
    : '';
  // const q = String(req.query.q ?? '');
  // const region = String(req.query.region ?? '');
  // const difficulty = String(req.query.difficulty ?? '');

  const trails = trailModel.searchTrails({
    q,
    region,
    difficulty,
  });

  const regions = regionModel.getAllRegions();

  res.render('site/trails.njk', {
    title: 'Explore Trails',
    trails,
    regions,
    q,
    region,
    difficulty,
    currentPage: 'trails',
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

  // GET TRAIL BY SLUG
  const trail = trailModel.getTrailBySlug(slug);

  // HANDLE 404
  if (!trail) {
    res.status(404).render('errors/404.njk', {
      title: '404 — Trail Not Found'
    });
    return;
  }

  // GET ALL REGIONS
  const regions = regionModel.getAllRegions();

  const relatedTrails = trailModel
    .getByRegion(trail.region_id)
    .filter((item) => item.id !== trail.id);

  // RENDER TRAIL DETAIL
  res.render('site/trail.njk', {
    title: trail.name,
    trail,
    relatedTrails,
    regions,
    showFilters: true,
    formattedDate: formatDate(trail.created_at),
  });
}

// ========================================
// GET ALL TRAILS
// GET /trails
// ========================================

export function getTrails(
  req: Request,
  res: Response
): void {
  const q = typeof req.query.q === 'string'
    ? req.query.q
    : '';

  const region = typeof req.query.region === 'string'
    ? req.query.region
    : '';

  const difficulty = typeof req.query.difficulty === 'string'
    ? req.query.difficulty
    : '';

  const trails = trailModel.searchTrails({
    q,
    region,
    difficulty,
  });

  const regions = regionModel.getAllRegions();

  res.render('site/trails.njk', {
    title: 'Explore Trails',
    trails,
    regions,
    q,
    region,
    difficulty,
    currentPage: 'trails',
    showFilters: true,
  });
}


// ========================================
// GET ALL REGIONS
// GET /regions
// ========================================

// GET ALL REGIONS
export function getRegions(
  _req: Request,
  res: Response
): void {
  const regions = regionModel.getAllRegions();

  res.render('site/regions.njk', {
    title: 'Explore Regions',
    regions,
  });
}

// GET REGION DETAIL
export function regionDetail(
  req: Request<{ slug: string }>,
  res: Response
): void {
  const { slug } = req.params;

  const region = regionModel.getRegionBySlug(slug);

  if (!region) {
    res.status(404).render('errors/404.njk');
    return;
  }

  const trails = trailModel.getByRegion(region.id);

  res.render('site/region.njk', {
    title: region.name,
    region,
    trails,
    showFilters: true
  });
}

