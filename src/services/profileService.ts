import { supabase } from '../lib/supabaseClient'

export async function updateProfileInfo(
  userId: string,
  updates: { name?: string; phone?: string }
): Promise<void> {
  const { error } = await supabase.from('profiles').update(updates).eq('id', userId)
  if (error) throw error
}