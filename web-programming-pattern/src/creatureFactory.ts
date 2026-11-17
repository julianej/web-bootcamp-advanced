
// Summoning Circle
// Acceptance criteria
// - Each ingredient (fire, air, sparkles) summons a different creature
// - Every creature has a name, and when it uses its ability, it logs what it does, for example Dragon breathes fire
// - An unknown ingredient throws an error that names the ingredient

// Technical requirements
// - A SummoningCircle class with a method summon(ingredient: string) works as a factory
// - The calling code only knows a shared Creature interface, never the concrete creature classes
// Done whenA script summons one creature per ingredient, lets each one use its ability, and catches the error for an unknown ingredient.

interface Creature {
  name: string;
  useAbility(): void;
}

class Dragon implements Creature {
  name = "Dragon";

  useAbility(): void {
    console.log(`${this.name} breathes fire`);
  }
}

class Phoenix implements Creature {
  name = "Phoenix";

  useAbility(): void {
    console.log(`${this.name} rises from the ashes`);
  }
}

class Fairy implements Creature {
  name = "Fairy";

  useAbility(): void {
    console.log(`${this.name} casts a spell`);
  }
}

// Die Factory: Zuordnung Zutat -> Konstruktor an genau einer Stelle.
class SummoningCircle {
  private readonly recipes = new Map<string, () => Creature>([
    ["fire", () => new Dragon()],
    ["air", () => new Phoenix()],
    ["sparkles", () => new Fairy()],
  ]);

  summon(ingredient: string): Creature {
    const recipe = this.recipes.get(ingredient);
    if (!recipe) {
      throw new Error(`Unknown ingredient: ${ingredient}`);
    }
    return recipe();
  }
}

// Demo
const circle = new SummoningCircle();

for (const ingredient of ["fire", "air", "sparkles"]) {
  const creature = circle.summon(ingredient);
  console.log(`Summoned: ${creature.name}`);
  creature.useAbility();
}

try {
  circle.summon("mud");
} catch (error) {
  console.log((error as Error).message);
}

// INSTALL: npm install -g tsx
// TEST: npx tsx creatureFactory.ts
// TEST: npx tsx src/creatureFactory.ts   