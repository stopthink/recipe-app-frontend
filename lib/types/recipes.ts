export interface CreateRecipe {
  name: string;
  description: string;
  recipeUrl?: string;
  user: UserFK;
  ingredients: CreateIngredients;
}

export interface Recipe extends CreateRecipe {
  id: number;
  ingredients: Ingredients;
}

export type Recipes = Recipe[];

export interface CreateIngredient {
  name: string;
  quantity: number;
  unit: string;
  orderIndex: number;
}

export interface Ingredient extends CreateIngredient {
  id: number;
}

export type Ingredients = Ingredient[];
export type CreateIngredients = CreateIngredient[];

export interface UserFK {
  id: number;
}

export interface User extends UserFK {
  name: string;
  email: string;
}
