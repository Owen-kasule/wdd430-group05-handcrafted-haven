import { createClient } from '@supabase/supabase-js';
import type { User } from '@/types/definitions';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function handleDatabaseError(error: any, context: string): never {
  console.error(`Database Error (${context}):`, error);
  throw new Error(`Failed to ${context}`);
}

export async function updateUser(id: string, updates: { name?: string; email?: string; role?: string }) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}


export async function getUserById(id: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }

  return data;
}
