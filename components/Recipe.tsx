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
        <CardFooter>
          <Button type="submit" className="w-full">
            View Recipe
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
