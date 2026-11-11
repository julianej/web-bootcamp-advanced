import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDB } from './database.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export function initDB() {
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    // const migration = fs.readFileSync(
    //   path.join(__dirname, 'migrate.sql'),
    //   'utf8'
    // );
    const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
    const db = getDB();
    db.exec(schema);
    // db.exec(migration);
    db.exec(seed);
    console.log('Database initialised.');
}
//# sourceMappingURL=init.js.map