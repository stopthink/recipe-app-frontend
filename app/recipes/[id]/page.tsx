import Recipe from '@/components/Recipe';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RecipePage({ params }: PageProps) {
  const { id } = await params;
  const recipe = await fetchRecipe(parseInt(id));

  return (
    <div>
      <Recipe recipe={recipe}></Recipe>
    </div>
  );
}

async function fetchRecipe(id: number) {
  const response = await fetch(`${process.env.API_HOST}api/recipes/${id}`, {
    headers: {
      Authorization:
        'Basic ' + btoa(process.env.API_USER + ':' + process.env.API_PASS),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch recipe');
  }

  return response.json();
}
