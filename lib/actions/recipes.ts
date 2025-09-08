'use server';

import { redirect } from 'next/navigation';
import { addRecipe } from '@/lib/api/recipes';
import { CreateRecipe, Ingredients } from '@/lib/types/recipes';

export async function createRecipe(formData: FormData) {
  try {
    // TODO: attach user session to data in createRecipe()

    const recipe: CreateRecipe = {
      user: { id: 1 },
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      recipeUrl: formData.get('recipeUrl') as string,
      ingredients: JSON.parse(
        (formData.get('ingredients') as string) || '[]'
      ) as Ingredients,
    };

    const newRecipe = await addRecipe(recipe);
    redirect('/recipes/' + newRecipe.id);
  } catch (error) {
    // Only log actual errors (not NEXT_REDIRECT)
    if (!(error instanceof Error) || error.message !== 'NEXT_REDIRECT') {
      console.error('Error creating recipe:', error);
    }
    throw error;
  }
}
