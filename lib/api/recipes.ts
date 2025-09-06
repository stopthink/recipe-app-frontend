import { CreateRecipe } from '@/lib/types/recipes';

// TODO: add success message/info to return from these fucntions

function getAuthHeaders() {
  const headers = new Headers();
  headers.append(
    'Authorization',
    'Basic ' + btoa(process.env.API_USER + ':' + process.env.API_PASS)
  );
  return headers;
}

export async function fetchRecipes() {
  const headers = getAuthHeaders();

  try {
    const response = await fetch(process.env.API_HOST + 'api/recipes', {
      method: 'GET',
      headers: headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}, ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.log('Failed to fetch recipes', error);
    throw error;
  }
}

export async function fetchRecipe(id: number) {
  const headers = getAuthHeaders();

  try {
    const response = await fetch(process.env.API_HOST + 'api/recipes/' + id, {
      method: 'GET',
      headers: headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}, ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.log('Failed to fetch recipe', error);
    throw error;
  }
}

export async function addRecipe(recipe: CreateRecipe) {
  const headers = getAuthHeaders();
  headers.append('Content-Type', 'application/json');

  try {
    const response = await fetch(process.env.API_HOST + 'api/recipes', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}, ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.log('Failed to add recipe', error);
    throw error;
  }
}
