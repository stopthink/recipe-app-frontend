import Recipes from '@/components/Recipes';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="container justify-between mx-auto px-4 py-4">
      <Recipes></Recipes>
    </div>
  );
}
