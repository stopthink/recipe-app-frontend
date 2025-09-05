import RecipeCard from '@/components/RecipeCard';
import type { Recipe, Recipes } from '@/lib/types/recipes';
import { fetchRecipes } from '@/lib/api/recipes';

export default async function Recipes() {
  const recipes: Recipes = await fetchRecipes();

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  gap-6"
    >
      {recipes.map((recipe: Recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
