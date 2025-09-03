import RecipeCard from '@/components/Recipe';
import type { Recipe, RecipesResponse } from '@/lib/types/recipes';

export default async function Recipes() {
  const headers = new Headers();
  headers.append(
    'Authorization',
    'Basic ' + btoa(process.env.API_USER + ':' + process.env.API_PASS)
  );

  try {
    const response = await fetch(process.env.API_HOST + 'recipes', {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const recipes = data._embedded.recipes;

    return (
      <div>
        {recipes.map((recipe: Recipe) => (
          <RecipeCard
            key={recipe._links.self.href.split('/').pop()}
            recipe={recipe}
          />
        ))}
      </div>
    );
  } catch (error) {
    return <div>Error loading recipes</div>;
  }
}
