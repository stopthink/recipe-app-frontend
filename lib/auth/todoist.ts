import type { TodoistTokenResponse, TodoistUser } from '@/lib/types/todoist';
import { OAuthError } from '@/lib/types/auth';

// Generate the OAuth authorization URL
export function getTodoistAuthUrl(state: string): string {
  const baseUrl = 'https://todoist.com/oauth/authorize';
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_TODOIST_CLIENT_ID!,
    scope: 'data:read_write',
    state: state,
  });

  return `${baseUrl}?${params.toString()}`;
}

// Exchange authorization code for access token
export async function exchangeTodoistCode(code: string): Promise<TodoistTokenResponse> {
  const response = await fetch('https://todoist.com/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_TODOIST_CLIENT_ID!,
      client_secret: process.env.TODOIST_CLIENT_SECRET!,
      code: code,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new OAuthError(
      `Failed to exchange authorization code: ${response.status} ${errorText}`,
      'todoist',
      'token_exchange'
    );
  }

  return response.json() as Promise<TodoistTokenResponse>;
}

// Get user info from Todoist API
export async function getTodoistUser(accessToken: string): Promise<TodoistUser> {
  const response = await fetch('https://api.todoist.com/api/v1/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new OAuthError(
      `Failed to fetch user info: ${response.status} ${errorText}`,
      'todoist',
      'user_fetch'
    );
  }

  return response.json() as Promise<TodoistUser>;
}
