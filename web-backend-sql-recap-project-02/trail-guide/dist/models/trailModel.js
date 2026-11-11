import db from '../db/database.js';
const SELECT_WITH_REGION = `
  SELECT
    t.id, t.name, t.description, t.distance_km, t.elevation_m,
    t.difficulty, t.created_at,
    r.id      AS region_id,
    r.name    AS region_name,
    r.country AS country
  FROM trails t
  INNER JOIN regions r ON r.id = t.region_id
`;
export function getAllWithRegion() {
    return db
        .prepare(`${SELECT_WITH_REGION} ORDER BY r.name, t.name`)
        .all();
}
export function getById(id) {
    return db.prepare(`${SELECT_WITH_REGION} WHERE t.id = ?`).get(id);
}
export function getByRegion(regionId) {
    return db
        .prepare(`${SELECT_WITH_REGION} WHERE r.id = ? ORDER BY t.name`)
        .all(regionId);
}
export function create(input) {
    const result = db
        .prepare(`INSERT INTO trails (region_id, name, description, distance_km, elevation_m, difficulty)
       VALUES (?, ?, ?, ?, ?, ?)`)
        .run(input.region_id, input.name, input.description, input.distance_km, input.elevation_m, input.difficulty);
    return getById(Number(result.lastInsertRowid));
}
export function update(id, input) {
    db.prepare(`UPDATE trails
     SET region_id = ?, name = ?, description = ?, distance_km = ?, elevation_m = ?, difficulty = ?
     WHERE id = ?`).run(input.region_id, input.name, input.description, input.distance_km, input.elevation_m, input.difficulty, id);
    return getById(id);
}
export function remove(id) {
    return db.prepare('DELETE FROM trails WHERE id = ?').run(id).changes;
}
//# sourceMappingURL=trailModel.js.map