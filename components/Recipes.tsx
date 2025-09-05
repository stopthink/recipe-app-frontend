import RecipeCard from '@/components/Recipe';
import type { Recipe } from '@/lib/types/recipes';

export default async function Recipes() {
  const headers = new Headers();
  headers.append(
    'Authorization',
    'Basic ' + btoa(process.env.API_USER + ':' + process.env.API_PASS)
  );

  try {
    const response = await fetch(process.env.API_HOST + 'api/recipes', {
      method: 'GET',
      headers: headers,
    });
    if (!response.ok) {
      console.log(`Error: ${response.statusText} ${response.status}`);
      throw new Error(`HTTP ${response.status}, ${response.statusText}`);
    }

    const data = await response.json();
    // console.log(data);
    const recipes = data;

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
  } catch (error) {
    console.log(error);
    return <div>Error loading recipes</div>;
  }
}
