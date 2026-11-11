
// src/db/seed.ts

import { connectDB, getDB, closeDB } from './database.js';

// ========================================
// SEED DATABASE
// ========================================

async function seedDatabase(): Promise<void> {
  await connectDB();

  const db = getDB();

  try {
    // ------------------------------------
    // REGIONS
    // ------------------------------------

    const insertRegion = db.prepare(`
      INSERT OR IGNORE INTO regions (name, country)
      VALUES (?, ?)
    `);

    insertRegion.run('Bavarian Alps', 'Germany');
    insertRegion.run('Scottish Highlands', 'Scotland');

    // ------------------------------------
    // TRAILS
    // ------------------------------------

    const insertTrail = db.prepare(`
      INSERT OR IGNORE INTO trails (
        region_id,
        name,
        slug,
        description,
        distance_km,
        elevation_m,
        difficulty,
        image,
        created_at
      )
      VALUES (
        (SELECT id FROM regions WHERE name = ?),
        ?, ?, ?, ?, ?, ?, ?, ?
      )
    `);

    const now = Math.floor(Date.now() / 1000);

    const trails = [
      {
        region: 'Bavarian Alps',
        name: 'Watzmann Traverse',
        slug: 'watzmann-traverse',
        description: 'A challenging alpine route through the spectacular Watzmann massif.',
        distance: 18.5,
        elevation: 1450,
        difficulty: 'hard',
        image: '/img/trail-07.png',
      },
      {
        region: 'Bavarian Alps',
        name: 'Eibsee Loop',
        slug: 'eibsee-loop',
        description: 'A beautiful circular trail around the turquoise waters of Eibsee.',
        distance: 7.5,
        elevation: 150,
        difficulty: 'easy',
        image: '/img/trail-06.png',
      },
      {
        region: 'Scottish Highlands',
        name: 'Ben Nevis Summit',
        slug: 'ben-nevis-summit',
        description: 'A demanding mountain hike to the highest summit in the United Kingdom.',
        distance: 17,
        elevation: 1345,
        difficulty: 'hard',
        image: '/img/trail-05.png',
      },
    ];

    for (const trail of trails) {
      insertTrail.run(
        trail.region,
        trail.name,
        trail.slug,
        trail.description,
        trail.distance,
        trail.elevation,
        trail.difficulty,
        trail.image,
        now
      );
    }

    console.log('Database seeded successfully!');
    console.log(`${trails.length} trails processed.`);

  } finally {
    closeDB();
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Database seeding failed:', error);
  process.exitCode = 1;
});
