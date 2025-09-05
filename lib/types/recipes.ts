export interface Recipe {
  id: number;
  name: string;
  description: string;
  recipeUrl: string;
  createdAt: string;
  user: User;
  ingredients: Ingredient;
}

export interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  orderIndex: number;
}

type Ingredients = Ingredient[];

type Recipes = Recipe[];

export interface User {
  id: number;
  name: string;
  email: string;
}
