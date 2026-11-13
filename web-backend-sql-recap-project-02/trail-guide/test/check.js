import * as regions from './models/regionModel.js';
import * as trails from './models/trailModel.js';

//ERROR the database rejected a trail with a non-existent region
try {
  trails.create({
    region_id: 999, name: 'Ghost trail', description: '',
    distance_km: 5, elevation_m: 0, difficulty: 'easy',
  });
} catch (err) {
  console.log('Expected error:', err.message);
}

console.log('Regions:', regions.getAll());
console.log('All trails:', trails.getAllWithRegion());
console.log('Trail 1:', trails.getById(1));

// UNDEFINED
console.log('Trail 999:', trails.getById(999));