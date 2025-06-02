'use client';

import { useState } from 'react';
import { createClient } from '../lib/supabase';
import { useRouter } from 'next/router';

const supabase = createClient();

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) {
      setError(signUpError.message);
    } else {
      router.push('/onboarding');
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError(signInError.message);
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded">
      <h1 className="text-2xl mb-4">Sign Up / Log In</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 mb-4"
      />
      <button
        onClick={handleSignUp}
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 mb-2"
      >
        {loading ? 'Loading…' : 'Sign Up'}
      </button>
      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-green-600 text-white p-2"
      >
        {loading ? 'Loading…' : 'Log In'}
      </button>
    </div>
  );
}
