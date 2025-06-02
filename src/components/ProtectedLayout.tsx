'use client';

import { useSession } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Sidebar from './Sidebar';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session === null) {
      router.replace('/auth');
    }
  }, [session, router]);

  if (!session) {
    return <div className="p-4">Redirecting to login…</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
