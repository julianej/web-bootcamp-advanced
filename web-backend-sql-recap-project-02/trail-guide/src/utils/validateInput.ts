
import type { Difficulty } from '../models/types.js';

const ALLOWED_DIFFICULTIES: Difficulty[] = [
  'easy',
  'moderate',
  'hard',
];

export function validateTrailInput(
  body: unknown
): string | null {

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return 'Request body must be a JSON object.';
  }

  const trail = body as Record<string, unknown>;

  const requiredFields = [
    'name',
    'region_id',
    'description',
    'distance_km',
    'elevation_m',
    'difficulty',
  ];

  for (const field of requiredFields) {
    if (
      trail[field] === undefined ||
      trail[field] === null ||
      trail[field] === ''
    ) {
      return `Missing required field: ${field}`;
    }
  }

  if (
    typeof trail.name !== 'string' ||
    typeof trail.description !== 'string' ||
    (trail.image !== null && typeof trail.image !== 'string')
  ) {
    return 'Invalid name, description or image.';
  }

  if (!trail.name.trim() || !trail.description.trim()) {
    return 'Name and description cannot be empty.';
  }

  if (
    typeof trail.region_id !== 'number' ||
    !Number.isInteger(trail.region_id)
  ) {
    return 'region_id must be an integer.';
  }

  if (
    typeof trail.distance_km !== 'number' ||
    !Number.isFinite(trail.distance_km) ||
    trail.distance_km <= 0 ||
    typeof trail.elevation_m !== 'number' ||
    !Number.isFinite(trail.elevation_m) ||
    trail.elevation_m < 0
  ) {
    return 'Invalid distance or elevation.';
  }

  if (
    typeof trail.difficulty !== 'string' ||
    !ALLOWED_DIFFICULTIES.includes(trail.difficulty as Difficulty)
  ) {
    return 'Invalid difficulty. Use easy, moderate or hard.';
  }

  return null;
}
