// src/components/SupabaseProvider.tsx
'use client';

import { useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

interface SupabaseProviderProps {
  children: ReactNode;
  initialSession: Session | null;
}

export default function SupabaseProvider({
  children,
  initialSession,
}: SupabaseProviderProps) {
  // Utilise createBrowserClient pour le client Supabase côté navigateur
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const [supabaseClient] = useState(() =>
    createBrowserClient<Database>(
      supabaseUrl || "http://localhost",
      supabaseAnonKey || "public-anon-key"
    )
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={initialSession}>
      {children}
    </SessionContextProvider>
  );
}
