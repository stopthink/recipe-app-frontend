import Recipe from '@/components/Recipe';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RecipePage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div>
      <Recipe id={parseInt(id)}></Recipe>
    </div>
  );
}
