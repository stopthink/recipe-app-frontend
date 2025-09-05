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
    <div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{recipe.name}</CardTitle>
          <CardDescription>{recipe.description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex-col gap-2">
          <Button asChild className="w-full">
            <Link href={``}>View Recipe</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
