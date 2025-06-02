'use client';

import { useSession } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProtectedPage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace('/auth');
    }
  }, [session]);

  if (!session) {
    return <div className="p-4">Redirecting to login…</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl">Welcome to the Protected Page</h1>
      <p>This page is protected by client-side authentication.</p>
    </div>
  );
}
