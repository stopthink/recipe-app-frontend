'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogoutButton } from './logout-button';
import { useAuth } from '@/context/AuthContext';
import { CurrentUserAvatar } from '@/components/current-user-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { CirclePlus } from 'lucide-react';

export function AuthButton() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="h-8 w-32 animate-pulse bg-gray-200 rounded" />;
  }

  return user ? (
    <div className="flex items-center gap-6">
      <Button asChild>
        <Link href="/recipes/new">
          <CirclePlus />
          Add Recipe
        </Link>
      </Button>
      <ThemeSwitcher />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CurrentUserAvatar />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{user.email}</DropdownMenuItem>
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" className="cursor-pointer" variant={'outline'}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" className="cursor-pointer" variant={'default'}>
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
