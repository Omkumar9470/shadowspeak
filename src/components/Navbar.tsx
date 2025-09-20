'use client'

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Shadowspeak
        </Link>
        {session ? (
          <div className="flex items-center gap-4">
            <span className="hidden md:block">
              Welcome, {user?.name || user?.email}
            </span>
            <Button onClick={() => signOut()} variant="outline">
              Logout
            </Button>
          </div>
        ) : (
          <Button onClick={() => signIn()} variant="outline">
            Login
          </Button>
        )}
      </div>
    </nav>
  );
}
