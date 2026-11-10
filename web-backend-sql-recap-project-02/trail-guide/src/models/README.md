### TypeScript Utility Types

TypeScript provides several built-in utility types that help create reusable and maintainable types. Here are the ones you are most likely to encounter, with examples from this project.

#### `Pick<Type, Keys>`

Keeps only the specified properties of a type. It is essentially the opposite of `Omit`.

```ts
type RegionName = Pick<Region, 'name' | 'country'>;
// { name: string; country: string }
```

#### `Partial<Type>`

Makes all properties optional. This is useful when updating only selected fields of an existing object.

```ts
type TrailUpdate = Partial<TrailInput>;
// { region_id?: number; name?: string; ... }
```

#### `Required<Type>`

Makes all properties mandatory, including properties that were originally optional.

```ts
type CompleteTrail = Required<TrailInput>;
```

#### `Readonly<Type>`

Prevents properties from being reassigned after an object has been created.

```ts
const trail: Readonly<Trail> = getById(1)!;

trail.name = 'New Trail'; // TypeScript error
```

#### `Record<Keys, Type>`

Creates an object type with a predefined set of keys and a shared value type.

For example, mapping each trail difficulty to a display label:

```ts
const difficultyLabel: Record<Difficulty, string> = {
  easy: 'Easy',
  moderate: 'Moderate',
  hard: 'Hard',
};
```

TypeScript checks that all keys from `Difficulty` are included. This is particularly useful for template display labels, dropdowns and configuration objects.

#### `ReturnType<typeof Function>`

Extracts the return type of a function, avoiding the need to define the same type twice.

```ts
type TrailList = ReturnType<typeof getAllWithRegion>;
// Trail[]
```

#### Utility Types Used in This Project

| Utility Type | Purpose |
|---|---|
| `Omit` | Excludes properties when creating input types |
| `Pick` | Selects specific properties from an existing type |
| `Record` | Defines mappings such as difficulty labels |
| `Partial` | Makes properties optional, useful for future PATCH endpoints |
| `Readonly` | Prevents accidental property reassignment |
| `ReturnType` | Reuses function return types |

**Project takeaway:** Use utility types to derive new types from existing interfaces instead of duplicating type definitions. This keeps the codebase consistent and makes future changes easier to maintain.
