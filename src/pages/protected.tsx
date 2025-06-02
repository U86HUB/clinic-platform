import { GetServerSideProps } from 'next';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return context.req.cookies[name] ?? null;
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
};

export default function ProtectedPage({ user }: { user: any }) {
  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <p>This page is protected by server-side authentication.</p>
    </div>
  );
}
