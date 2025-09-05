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
