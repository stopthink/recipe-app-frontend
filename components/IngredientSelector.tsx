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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ChevronsUpDown, Plus, X } from 'lucide-react';
import { Ingredients, CreateIngredient } from '@/lib/types/recipes';

interface IngredientsProps {
  existingIngredients: Ingredients;
}

const UNIT_OPTIONS = [
  'cups',
  'tbsp',
  'tsp',
  'oz',
  'lbs',
  'g',
  'kg',
  'ml',
  'l',
  'each',
];

export default function IngredientSelector({
  existingIngredients,
}: IngredientsProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [ingredients, setIngredients] = useState<CreateIngredient[]>([]);

  const addIngredient = (name: string) => {
    const newIngredient: CreateIngredient = {
      name: name.trim(),
      quantity: 1,
      unit: 'cups',
      orderIndex: 1,
    };
    setIngredients([...ingredients, newIngredient]);
    setOpen(false);
    setSearchValue('');
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (
    index: number,
    field: keyof CreateIngredient,
    value: string
  ) => {
    const updated = ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [field]: value } : ingredient
    );
    setIngredients(updated);
  };

  const filteredIngredients = existingIngredients.filter(
    (ingredient) =>
      ingredient.name.toLowerCase().includes(searchValue.toLowerCase()) &&
      !ingredients.some(
        (ing) => ing.name.toLowerCase() === ingredient.name.toLowerCase()
      )
  );

  return (
    <div className="space-y-4">
      <input
        type="hidden"
        name="ingredients"
        value={JSON.stringify(ingredients)}
      />
      {/* Add Ingredient Combobox */}
      <div className="flex items-center gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between h-9 bg-transparent"
            >
              Add Ingredient
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="p-0 max-h-60 overflow-auto"
            side="bottom"
            align="start"
            avoidCollisions={false}
            collisionPadding={30}
            style={{
              width: 'var(--radix-popover-trigger-width)',
            }}
          >
            <Command>
              <CommandInput
                placeholder="Search ingredients..."
                value={searchValue}
                onValueChange={setSearchValue}
              />
              <CommandList>
                {filteredIngredients.length > 0 && (
                  <>
                    {filteredIngredients.map((ingredient) => (
                      <CommandItem
                        key={ingredient.id}
                        onSelect={() => addIngredient(ingredient.name)}
                        className="cursor-pointer"
                      >
                        {ingredient.name}
                      </CommandItem>
                    ))}
                  </>
                )}

                {searchValue && (
                  <CommandEmpty>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start h-8"
                      onClick={() => addIngredient(searchValue)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add "{searchValue}"
                    </Button>
                  </CommandEmpty>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Ingredients List */}
      {ingredients.length > 0 && (
        <div className="space-y-2">
          <div className="border rounded-lg bg-muted/20 p-5">
            <h4 className="flex gap-2 text-sm font-medium text-muted-foreground">
              Ingredients
              <Badge variant="secondary" className="text-xs">
                {ingredients.length}
              </Badge>
            </h4>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center py-1 gap-4">
                {/* Ingredient Name */}
                <div className="flex-1 min-w-0">
                  <Input
                    value={ingredient.name}
                    onChange={(e) =>
                      updateIngredient(index, 'name', e.target.value)
                    }
                    placeholder="Ingredient name"
                    className="h-8 text-sm"
                  />
                </div>

                {/* Quantity */}
                <div className="w-20">
                  <Input
                    value={ingredient.quantity}
                    onChange={(e) =>
                      updateIngredient(index, 'quantity', e.target.value)
                    }
                    placeholder="1"
                    className="h-8 text-sm"
                  />
                </div>

                {/* Unit */}
                <div className="w-24">
                  <Select
                    value={ingredient.unit}
                    onValueChange={(value) =>
                      updateIngredient(index, 'unit', value)
                    }
                  >
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {UNIT_OPTIONS.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Remove Button */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeIngredient(index)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
