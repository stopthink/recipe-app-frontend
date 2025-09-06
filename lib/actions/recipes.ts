'use server';

import { redirect } from 'next/navigation';
import { addRecipe } from '@/lib/api/recipes';

export async function createRecipe(formData: FormData) {
  try {
    // inject user and ingredients until we get proper auth
    // TODO: attach user session to data in createRecipe()
    // TODO: attach ingredients to data in createRecipe()

    const recipe = {
      user: { id: 1 },
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      ingredients: [
        { orderIndex: 1, unit: 'lb', quantity: 1, name: 'chicken' },
        { orderIndex: 2, unit: 'oz', quantity: 4, name: 'butter' },
      ],
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
