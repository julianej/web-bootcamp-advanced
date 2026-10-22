
// A type alias Ingredient with a name (string) and amountGrams (number)
type Ingredient = {
  name: string;
  amountGrams: number;
};

//  A type alias Recipe with a name, servings (number), 
// vegetarian (boolean), and ingredients (an array of Ingredient)
type Recipe = {
  name: string;
  servings: number;
  vegetarian: boolean;
  ingredients: Ingredient[];
};

// Annotate as recipe
// Two variables annotated as Recipe eg pasta,  //
const pastaRecipe: Recipe = {
  name: "Tomato Pasta",
  servings: 2,
  vegetarian: true,
  // Connect the types //
  ingredients: [
    { name: "Pasta", amountGrams: 200 },
    { name: "Tomatoes", amountGrams: 300 },
    { name: "Olive oil", amountGrams: 20 },
  ],
};

// Two variables annotated as Recipe, eg curry, //
// each holding a realistic recipe with at least two ingredients
const curryRecipe: Recipe = {
  name: "Chicken Curry",
  servings: 4,
  vegetarian: false,
  ingredients: [
    { name: "Chicken breast", amountGrams: 500 },
    { name: "Rice", amountGrams: 300 },
    { name: "Coconut milk", amountGrams: 400 },
  ],
};


// A function summarize(recipe: Recipe): string 
function summarize(recipe: Recipe): string {
// that returns a readable single-line description of the recipe
  const ingredientNames = recipe.ingredients
    .map((ingredient) => ingredient.name)
    .join(", ");

  const diet = recipe.vegetarian ? "vegetarian" : "non-vegetarian";

  return `${recipe.name} serves ${recipe.servings}, is ${diet}, and contains: ${ingredientNames}.`;
}

// A call to summarize for each recipe, logged to the console
console.log(summarize(pastaRecipe));
console.log(summarize(curryRecipe));
