import IngredientSelector from '@/components/IngredientSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createRecipe } from '@/lib/actions/recipes';
import { fetchIngredients } from '@/lib/api/recipes';

export default async function RecipeForm() {
  const ingredients = await fetchIngredients();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl justify-center justify-items">
        <form action={createRecipe}>
          <div className="space-y-6">
            <div className="mb-12">
              <h2 className="font-semibold text-gray-900">Create New Recipe</h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                Choose a name for your recipe and add its ingredients.
              </p>
            </div>

            <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4 grid gap-3">
                <Label htmlFor="name">Name:</Label>{' '}
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Recipe name"
                ></Input>
              </div>
            </div>
            <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4 grid gap-3">
                <Label htmlFor="name">Recipe URL:</Label>{' '}
                <Input
                  id="recipeUrl"
                  name="recipeUrl"
                  type="text"
                  placeholder="Recipe URL"
                ></Input>
              </div>
            </div>
            <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4 grid gap-3">
                <Label htmlFor="descrdiption">Description:</Label>
                <Textarea
                  name="description"
                  id="description"
                  placeholder="Recipe description"
                ></Textarea>
              </div>
            </div>
            <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4 grid gap-3">
                <IngredientSelector
                  existingIngredients={ingredients}
                ></IngredientSelector>
              </div>
            </div>
            <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4 grid gap-3">
                <Button type="submit">Create Recipe</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
