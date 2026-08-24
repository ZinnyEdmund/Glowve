import { supabase } from '../lib/supabaseClient'
import type { ShippingAddress } from '../types'

type AddressRow = {
  id: string
  full_name: string
  phone: string
  address: string
  city: string
  state: string | null
  zip_code: string
  country: string
}

function toShippingAddress(row: AddressRow, email: string): ShippingAddress {
  return {
    fullName: row.full_name,
    email,
    phone: row.phone,
    address: row.address,
    city: row.city,
    state: row.state ?? '',
    zipCode: row.zip_code,
    country: row.country,
  }
}

// Every user currently has at most one "default" address — this mirrors the
// original app's single flat address, just moved into its own table so order
// history can snapshot it independently of later edits.
export async function getDefaultAddress(
  userId: string,
  email: string
): Promise<ShippingAddress | null> {
  const { data, error } = await supabase
    .from('addresses')
    .select('id, full_name, phone, address, city, state, zip_code, country')
    .eq('user_id', userId)
    .eq('is_default', true)
    .maybeSingle()

  if (error) throw error
  if (!data) return null
  return toShippingAddress(data as AddressRow, email)
}

export async function saveDefaultAddress(userId: string, shipping: ShippingAddress): Promise<void> {
  const { data: existing, error: findErr } = await supabase
    .from('addresses')
    .select('id')
    .eq('user_id', userId)
    .eq('is_default', true)
    .maybeSingle()

  if (findErr) throw findErr

  const payload = {
    user_id: userId,
    full_name: shipping.fullName,
    phone: shipping.phone,
    address: shipping.address,
    city: shipping.city,
    state: shipping.state || null,
    zip_code: shipping.zipCode,
    country: shipping.country,
    is_default: true,
  }

  if (existing) {
    const { error } = await supabase.from('addresses').update(payload).eq('id', existing.id)
    if (error) throw error
  } else {
    const { error } = await supabase.from('addresses').insert(payload)
    if (error) throw error
  }
}