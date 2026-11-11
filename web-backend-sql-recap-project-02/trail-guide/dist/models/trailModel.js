import { getDB } from '../db/database.js';
// ========================================
// REUSABLE SQL QUERY
// ========================================
const SELECT_WITH_REGION = `
  SELECT
    t.id,
    t.name,
    t.description,
    t.distance_km,
    t.elevation_m,
    t.difficulty,
    t.image,
    t.created_at,
    r.id AS region_id,
    r.name AS region_name,
    r.country AS country
  FROM trails t
  INNER JOIN regions r ON r.id = t.region_id
`;
// ========================================
// READ: GET ALL TRAILS
// ========================================
export function getAllWithRegion() {
    return getDB()
        .prepare(`${SELECT_WITH_REGION} ORDER BY r.name, t.name`)
        .all();
}
// ========================================
// READ: GET TRAIL BY ID
// ========================================
export function getById(id) {
    return getDB()
        .prepare(`${SELECT_WITH_REGION} WHERE t.id = ?`)
        .get(id);
}
// ========================================
// READ: GET TRAILS BY REGION
// ========================================
export function getByRegion(regionId) {
    return getDB()
        .prepare(`${SELECT_WITH_REGION} WHERE r.id = ? ORDER BY t.name`)
        .all(regionId);
}
// ========================================
// CREATE: INSERT NEW TRAIL
// ========================================
export function create(input) {
    const result = getDB()
        .prepare(`INSERT INTO trails (
        region_id,
        name,
        description,
        distance_km,
        elevation_m,
        difficulty,
        image
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)`)
        .run(input.region_id, input.name, input.description, input.distance_km, input.elevation_m, input.difficulty, input.image);
    return getById(Number(result.lastInsertRowid));
}
// ========================================
// UPDATE: MODIFY EXISTING TRAIL
// ========================================
export function update(id, input) {
    getDB()
        .prepare(`UPDATE trails
       SET region_id = ?,
           name = ?,
           description = ?,
           distance_km = ?,
           elevation_m = ?,
           difficulty = ?,
           image = ?
       WHERE id = ?`)
        .run(input.region_id, input.name, input.description, input.distance_km, input.elevation_m, input.difficulty, input.image, id);
    return getById(id);
}
// ========================================
// DELETE: REMOVE TRAIL
// ========================================
export function remove(id) {
    return getDB()
        .prepare('DELETE FROM trails WHERE id = ?')
        .run(id).changes;
}
//# sourceMappingURL=trailModel.js.map