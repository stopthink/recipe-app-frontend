import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { exchangeTodoistCode, getTodoistUser } from '@/lib/auth/todoist';
import type { TodoistTokenResponse, TodoistUser } from '@/lib/types/todoist';
import type { User } from '@supabase/supabase-js';
import { OAuthError, getErrorMessage } from '@/lib/types/auth';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  // Validate we have the authorization code
  if (!code) {
    return NextResponse.redirect(`${origin}/error?message=missing_code`);
  }

  try {
    // Step 1: Exchange authorization code for Todoist access token
    const tokenResponse: TodoistTokenResponse = await exchangeTodoistCode(code);

    if (!tokenResponse.access_token) {
      throw new OAuthError(
        'No access token received from Todoist',
        'todoist',
        'token_exchange'
      );
    }

    // Step 2: Get user info from Todoist API
    const todoistUser: TodoistUser = await getTodoistUser(
      tokenResponse.access_token
    );

    if (!todoistUser.email) {
      throw new OAuthError(
        'No email found in Todoist user data',
        'todoist',
        'user_fetch'
      );
    }

    // Step 3: Use admin client to check if user exists
    const adminSupabase = createAdminClient();

    // Try to get existing user by email
    const { data: existingUsers, error: listError } =
      await adminSupabase.auth.admin.listUsers();

    if (listError) {
      throw new OAuthError(
        `Failed to list users: ${listError.message}`,
        'todoist',
        'user_lookup',
        listError
      );
    }

    const existingUser: User | undefined = existingUsers.users.find(
      (u) => u.email === todoistUser.email
    );

    let supabaseUser: User;

    if (existingUser) {
      // Update existing user's metadata with latest Todoist info
      const { data: updatedUser, error: updateError } =
        await adminSupabase.auth.admin.updateUserById(existingUser.id, {
          user_metadata: {
            ...existingUser.user_metadata,
            full_name: todoistUser.full_name,
            provider: 'todoist',
            todoist_id: todoistUser.id,
            avatar_url: todoistUser.avatar_url || null,
            todoist_access_token: tokenResponse.access_token,
            last_todoist_login: new Date().toISOString(),
          },
        });

      if (updateError) {
        throw new OAuthError(
          `Failed to update user: ${updateError.message}`,
          'todoist',
          'user_update',
          updateError
        );
      }

      supabaseUser = updatedUser.user;
    } else {
      // Step 4: Create new user without password using admin client
      const { data: newUserData, error: createError } =
        await adminSupabase.auth.admin.createUser({
          email: todoistUser.email,
          email_confirm: true, // Skip email verification since Todoist verified it
          user_metadata: {
            full_name: todoistUser.full_name,
            provider: 'todoist',
            todoist_id: todoistUser.id,
            avatar_url: todoistUser.avatar_url || null,
            todoist_access_token: tokenResponse.access_token,
            created_via: 'todoist_oauth',
            created_at: new Date().toISOString(),
          },
        });

      if (createError) {
        throw new OAuthError(
          `Failed to create user: ${createError.message}`,
          'todoist',
          'user_creation',
          createError
        );
      }

      supabaseUser = newUserData.user;
    }

    // Step 5: Sign the user in using the regular client
    const supabase = await createClient();

    // Generate a secure temporary password
    const tempPassword: string = crypto.randomUUID() + crypto.randomUUID();

    // Update the user with the temporary password
    const { error: updateError } =
      await adminSupabase.auth.admin.updateUserById(supabaseUser.id, {
        password: tempPassword,
      });

    if (updateError) {
      throw new OAuthError(
        `Failed to update user password: ${updateError.message}`,
        'todoist',
        'password_update',
        updateError
      );
    }

    // Now sign them in with the temporary password
    const { error: sessionError } = await supabase.auth.signInWithPassword({
      email: supabaseUser.email!,
      password: tempPassword,
    });

    if (sessionError) {
      throw new OAuthError(
        `Failed to sign in user: ${sessionError.message}`,
        'todoist',
        'session_creation',
        sessionError
      );
    }

    // Success! Redirect to home page
    return NextResponse.redirect(`${origin}/`);
  } catch (error) {
    console.error('Todoist OAuth error:', error);

    // Provide user-friendly error messages
    const errorMessage = getErrorMessage(error);
    return NextResponse.redirect(
      `${origin}/error?message=${encodeURIComponent(errorMessage)}`
    );
  }
}
