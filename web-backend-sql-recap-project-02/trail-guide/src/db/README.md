## TEST YOUR SQLITE

```ts
sqlite3 src/db/trailguide.db
```

## CHECK TABLES
```ts
SELECT id, name, image, created_at
FROM trails;
```

## INSIDE SQLITE
```ts
ALTER TABLE trails ADD COLUMN image TEXT;
```

## VERIFY THE TABLE
```ts
sqlite> PRAGMA table_info(trails);
0|id|INTEGER|0||1
1|region_id|INTEGER|1||0
2|name|TEXT|1||0
3|description|TEXT|0||0
4|distance_km|REAL|1||0
5|elevation_m|INTEGER|1|0|0
6|difficulty|TEXT|1||0
7|created_at|TEXT|1|datetime('now')|0
8|image|TEXT|0||0
sqlite> 
```

## UPDATE TRAILS from MIGRATE SQL
```ts
UPDATE trails
SET image = '/img/trail-01.png'
WHERE name = 'Partnachklamm Loop';

UPDATE trails
SET image = '/img/trail-02.png'
WHERE name = 'Zugspitze via Reintal';

UPDATE trails
SET image = '/img/trail-03.png'
WHERE name = 'Ben Nevis Mountain Track';
```

## VERIFY 
```ts
sqlite> SELECT id, name, image
   ...> FROM trails
   ...> WHERE name = 'Ben Nevis Mountain Track';
3|Ben Nevis Mountain Track|/img/trail-03.png
sqlite> 
```

## or, if you update SEED.SQL rerun
```ts
rm src/db/trailguide.db
npm run dev
```