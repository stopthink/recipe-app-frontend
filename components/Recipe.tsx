import Link from 'next/link';
import type { Recipe } from '@/lib/types/recipes';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Star, ListChecks } from 'lucide-react';
import { fetchRecipe } from '@/lib/api/recipes';
import { Badge } from '@/components/ui/badge';

export default async function Recipe({ id }: { id: number }) {
  const recipe: Recipe = await fetchRecipe(id);
  return (
    <div>
      <Card className="w-2xl">
        <CardHeader>
          <CardTitle>{recipe.name}</CardTitle>
          <CardDescription>{recipe.description}</CardDescription>
          <CardAction>
            <Tooltip>
              <TooltipTrigger asChild>
                <Star />
              </TooltipTrigger>
              <TooltipContent>Add to Favorites</TooltipContent>
            </Tooltip>
          </CardAction>
        </CardHeader>
        <CardContent>
          {recipe.ingredients.length > 0 && <b>Ingredients</b>}
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li
                key={ingredient.id}
                className="flex w-full justify-between py-1"
              >
                <span>
                  <Checkbox /> {ingredient.name}{' '}
                </span>
                <Badge className="bg-stone-200 text-stone-900">
                  {ingredient.quantity} {ingredient.unit}
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {recipe.recipeUrl && (
            <Button asChild variant="outline" className="w-full">
              <Link href={recipe.recipeUrl}>View Recipe</Link>
            </Button>
          )}
          <Button asChild className="w-full bg-red-400 hover:bg-red-300">
            <Link href={`recipes/${recipe.id}`}>
              <ListChecks /> Send to Todoist
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
