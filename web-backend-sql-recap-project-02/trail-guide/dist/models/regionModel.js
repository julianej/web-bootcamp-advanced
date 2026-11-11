import { getDB } from '../db/database.js';
// ========================================
// READ: GET ALL REGIONS
// ========================================
export function getAll() {
    return getDB()
        .prepare('SELECT * FROM regions ORDER BY name')
        .all();
}
// ========================================
// READ: GET REGION BY ID
// ========================================
export function getById(id) {
    return getDB()
        .prepare('SELECT * FROM regions WHERE id = ?')
        .get(id);
}
// ========================================
// CREATE: INSERT NEW REGION
// ========================================
export function create({ name, country }) {
    const result = getDB()
        .prepare('INSERT INTO regions (name, country) VALUES (?, ?)')
        .run(name, country);
    return getById(Number(result.lastInsertRowid));
}
// ========================================
// UPDATE: MODIFY EXISTING REGION
// ========================================
export function update(id, { name, country }) {
    getDB()
        .prepare('UPDATE regions SET name = ?, country = ? WHERE id = ?')
        .run(name, country, id);
    return getById(id);
}
// ========================================
// DELETE: REMOVE REGION
// ========================================
export function remove(id) {
    return getDB()
        .prepare('DELETE FROM regions WHERE id = ?')
        .run(id).changes;
}
//# sourceMappingURL=regionModel.js.map