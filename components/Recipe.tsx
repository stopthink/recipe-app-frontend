import type { Recipe } from '@/lib/types/recipes';

export default function Recipe({ recipe }: { recipe: Recipe }) {
  return (
    <div>
      <div>{recipe.name}</div>
      <div>{recipe.description}</div>
    </div>
  );
}
