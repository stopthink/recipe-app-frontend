import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { exchangeTodoistCode } from '@/lib/auth/todoist';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) {
    return NextResponse.redirect(`${origin}/error`);
  }

  try {
    // Exchange code for Todoist token
    const { access_token } = await exchangeTodoistCode(code);

    // Get user info from Todoist
    const userResponse = await fetch('https://api.todoist.com/rest/v2/user', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const todoistUser = await userResponse.json();

    // Create user in Supabase
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: todoistUser.email,
      password: 'todoist_oauth', // You'll need a better strategy here
    });

    return NextResponse.redirect(`${origin}/`);
  } catch (error) {
    return NextResponse.redirect(`${origin}/error`);
  }
}
