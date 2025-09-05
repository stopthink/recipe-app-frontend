import Link from 'next/link';
import type { Ingredient, Recipe } from '@/lib/types/recipes';
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

export default function Recipe({ recipe }: { recipe: Recipe }) {
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
          <b>Ingredients</b>
          <ul>
            {recipe.ingredients.map((ingredient: Ingredient) => (
              <li key={ingredient.id}>
                <Checkbox /> {ingredient.name}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button asChild variant="outline" className="w-full">
            <Link href={recipe.recipeUrl}>Watch Video</Link>
          </Button>
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
