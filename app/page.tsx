import Recipes from '@/components/Recipes';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="grid container justify-items-end mx-auto px-4 py-4">
        <Button asChild>
          <Link href="/recipes/new">
            <CirclePlus />
            Add Recipe
          </Link>
        </Button>
      </div>
      <div className="container justify-between mx-auto px-4 py-4">
        <Recipes></Recipes>
      </div>
    </>
  );
}
