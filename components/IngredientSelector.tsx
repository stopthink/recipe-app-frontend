'use client';

import { useState } from 'react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { Ingredient, Ingredients, CreateIngredient } from '@/lib/types/recipes';
import { Card } from '@/components/ui/card';

interface IngredientsProps {
  existingIngredients: Ingredients;
}

export default function IngredientSelector({
  existingIngredients,
}: IngredientsProps) {
  const [open, setOpen] = useState(false);
  const [ingredients, setIngredients] = useState<CreateIngredient[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const addIngredient = (ingredientName: string) => {
    console.log(ingredientName);
    setIngredients([
      ...ingredients,
      { name: ingredientName, quantity: 1, unit: 'cup', orderIndex: 1 },
    ]);
    setOpen(false);
    setSearchValue('');
  };

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Ingredient
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <Card>
            <Command>
              <CommandInput
                placeholder="Search ingredients..."
                value={searchValue}
                onValueChange={setSearchValue}
              />
              <CommandList>
                <CommandEmpty>
                  <div className="p-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => addIngredient(searchValue)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add "{searchValue}"
                    </Button>
                  </div>
                </CommandEmpty>

                {existingIngredients.map((ingredient: Ingredient) => (
                  <CommandItem
                    key={ingredient.id}
                    onSelect={() => addIngredient(ingredient.name)}
                  >
                    {ingredient.name}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </Card>
        </PopoverContent>
      </Popover>

      {/* Display selected ingredients */}
      <div className="flex flex-wrap gap-2">
        {ingredients.map((ingredient: CreateIngredient, index) => (
          <Badge
            key={`${ingredient}-${index}`}
            variant="secondary"
            className="flex items-center gap-1 px-3 py-2"
          >
            {ingredient.name}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => {
                console.log('remove ingredient!');
                setIngredients(ingredients.filter((_, i) => i !== index));
              }}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
}
