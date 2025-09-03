// Individual recipe
export interface Recipe {
  name: string;
  description: string;
  recipeUrl: string;
  createdAt: string;
  _links: {
    self: { href: string };
    recipe: { href: string };
    ingredients: { href: string };
    user: { href: string };
  };
}

// API response wrapper
export interface RecipesResponse {
  _embedded: {
    recipes: Recipe[];
  };
}
