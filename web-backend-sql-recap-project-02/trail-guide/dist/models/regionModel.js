import db from '../db/database.js';
export function getAll() {
    return db.prepare('SELECT * FROM regions ORDER BY name').all();
}
export function getById(id) {
    return db.prepare('SELECT * FROM regions WHERE id = ?').get(id);
}
export function create({ name, country }) {
    const result = db
        .prepare('INSERT INTO regions (name, country) VALUES (?, ?)')
        .run(name, country);
    return getById(Number(result.lastInsertRowid));
}
export function update(id, { name, country }) {
    db.prepare('UPDATE regions SET name = ?, country = ? WHERE id = ?').run(name, country, id);
    return getById(id);
}
export function remove(id) {
    return db.prepare('DELETE FROM regions WHERE id = ?').run(id).changes;
}
//# sourceMappingURL=regionModel.js.map