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

export default function Recipe({ recipe }: { recipe: Recipe }) {
  return (
    <div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{recipe.name}</CardTitle>
          <CardDescription>{recipe.description}</CardDescription>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        {/* <CardContent> */}
        {/*   <p>Card Content</p> */}
        {/* </CardContent> */}
        <CardFooter className="flex-col gap-2">
          <Button asChild variant="outline" className="w-full">
            <Link href={recipe.recipeUrl}>Watch Video</Link>
          </Button>
          <Button asChild className="w-full">
            <Link href={`recipes/${recipe._links.self.href.split('/').pop()}`}>
              View Recipe
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
