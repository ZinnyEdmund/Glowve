import { supabase } from '../lib/supabaseClient'
import type { Order, ShippingAddress } from '../types'

type OrderRow = {
  id: string
  order_number: string
  user_id: string
  shipping_full_name: string
  shipping_email: string
  shipping_phone: string
  shipping_address: string
  shipping_city: string
  shipping_state: string | null
  shipping_zip_code: string
  shipping_country: string
  subtotal: number
  shipping_cost: number
  tax: number
  total: number
  status: Order['status']
  payment_status: Order['paymentStatus']
  payment_method: Order['paymentMethod']
  transaction_id: string | null
  tracking_number: string | null
  created_at: string
  updated_at: string
}

type OrderItemRow = {
  id: string
  order_id: string
  product_id: number
  title: string
  thumbnail: string
  price: number
  quantity: number
}

function mapOrder(row: OrderRow, items: OrderItemRow[]): Order {
  return {
    id: row.id,
    orderNumber: row.order_number,
    userId: row.user_id,
    items: items.map((i) => ({
      id: i.id,
      productId: i.product_id,
      title: i.title,
      thumbnail: i.thumbnail,
      price: Number(i.price),
      quantity: i.quantity,
    })),
    shippingAddress: {
      fullName: row.shipping_full_name,
      email: row.shipping_email,
      phone: row.shipping_phone,
      address: row.shipping_address,
      city: row.shipping_city,
      state: row.shipping_state ?? '',
      zipCode: row.shipping_zip_code,
      country: row.shipping_country,
    },
    paymentMethod: row.payment_method,
    subtotal: Number(row.subtotal),
    shipping: Number(row.shipping_cost),
    tax: Number(row.tax),
    total: Number(row.total),
    status: row.status,
    paymentStatus: row.payment_status,
    transactionId: row.transaction_id ?? undefined,
    trackingNumber: row.tracking_number ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

// No user-id filter here on purpose — RLS decides what comes back
// (the caller's own orders, or everything if they're an admin).
export async function fetchMyOrders(): Promise<Order[]> {
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  if (!orders || orders.length === 0) return []

  const { data: items, error: itemsErr } = await supabase
    .from('order_items')
    .select('*')
    .in(
      'order_id',
      orders.map((o) => o.id)
    )
  if (itemsErr) throw itemsErr

  return (orders as OrderRow[]).map((o) =>
    mapOrder(
      o,
      (items as OrderItemRow[]).filter((i) => i.order_id === o.id)
    )
  )
}

export async function fetchOrderById(id: string): Promise<Order | null> {
  const { data: order, error } = await supabase.from('orders').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  if (!order) return null

  const { data: items, error: itemsErr } = await supabase.from('order_items').select('*').eq('order_id', id)
  if (itemsErr) throw itemsErr

  return mapOrder(order as OrderRow, items as OrderItemRow[])
}

export type CreateOrderInput = {
  items: { productId: number; quantity: number }[]
  shipping: ShippingAddress
  paymentMethod: string
  transactionId?: string
}

// The only way an order can be created — routes through the create-order
// Edge Function, which validates stock and recomputes totals server-side.
export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const { data, error } = await supabase.functions.invoke('create-order', { body: input })
  if (error) throw error
  if (data?.error) throw new Error(data.error)
  return mapOrder(data.order as OrderRow, data.items as OrderItemRow[])
}