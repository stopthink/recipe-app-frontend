'use client';

import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { AuthContextType } from '@/lib/types/auth';
import { getTodoistAuthUrl } from '@/lib/auth/todoist';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  // Add method stubs for now
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return false;
      }
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
        return false;
      }
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    repeatPassword: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      if (password !== repeatPassword) {
        setError('Passwords must match');
        return false;
      }
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });

      if (error) {
        setError(error.message);
        return false;
      }

      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sign up failed';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Google sign in failed'
      );
      setLoading(false);
    }
  };

  const signInWithTodoist = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const state = crypto.randomUUID();
      sessionStorage.setItem('todoist_oauth_state', state);
      const authUrl = getTodoistAuthUrl(state);
      window.location.href = authUrl;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Todoist sign in failed'
      );
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) {
        setError(error.message);
        return false;
      }
      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An error occurred';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setError(error.message);
        return false;
      }
      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An error occurred';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearError = (): void => {
    setError(null);
  };

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    logout,
    signUp,
    signInWithGoogle,
    signInWithTodoist,
    forgotPassword,
    updatePassword,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
