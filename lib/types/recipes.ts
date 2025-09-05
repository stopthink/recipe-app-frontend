export interface Recipe {
  id: number;
  name: string;
  description: string;
  recipeUrl: string;
  createdAt: string;
  user: User;
  ingredients: Ingredients;
}

export interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  orderIndex: number;
}

export type Ingredients = Ingredient[];

export type Recipes = Recipe[];

export interface User {
  id: number;
  name: string;
  email: string;
}
