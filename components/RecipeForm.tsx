import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createRecipe } from '@/lib/actions/recipes';

export default function RecipeForm() {
  return (
    <form action={createRecipe}>
      <Label htmlFor="name">Name:</Label>{' '}
      <Input
        id="name"
        name="name"
        type="text"
        placeholder="Recipe name"
      ></Input>
      <Label htmlFor="descrdiption">Description:</Label>
      <Textarea
        name="description"
        id="description"
        placeholder="Recipe description"
      ></Textarea>
      <Button type="submit">Create Recipe</Button>
    </form>
  );
}
