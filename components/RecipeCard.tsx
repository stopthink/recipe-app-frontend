import Link from 'next/link';
import type { Recipe } from '@/lib/types/recipes';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Recipe({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`recipes/${recipe.id}`}>
      <Card className="gap-4 flex flex-col w-2xl w-full h-full max-w-sm hover:bg-stone-50">
        <CardHeader>
          <CardTitle>{recipe.name}</CardTitle>
          <CardDescription>{recipe.description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex-col gap-2 mt-auto">
          <Button className="w-full cursor-pointer">View Recipe</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
