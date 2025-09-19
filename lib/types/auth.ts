import { User } from '@supabase/supabase-js';

// Custom error class for OAuth-related errors
export class OAuthError extends Error {
  constructor(
    message: string,
    public provider: string,
    public step: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'OAuthError';
  }
}

// OAuth callback error types
export type OAuthErrorType =
  | 'missing_code'
  | 'token_exchange_failed'
  | 'user_fetch_failed'
  | 'user_creation_failed'
  | 'session_creation_failed'
  | 'oauth_failed';

// Helper function to create user-friendly error messages
export function getErrorMessage(error: unknown): string {
  if (error instanceof OAuthError) {
    return `Authentication failed: ${error.message}`;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (
    email: string,
    password: string,
    repeatPassword: string
  ) => Promise<boolean>;
  signInWithGoogle: (e: React.FormEvent) => Promise<void>;
  signInWithTodoist: (e: React.FormEvent) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  clearError: () => void;
}
