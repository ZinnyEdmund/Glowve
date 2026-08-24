import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { Order } from '../types/index'
import { useAuth } from './AuthContext'
import { fetchMyOrders } from '../services/orderService'

type OrderContextType = {
  orders: Order[]
  loading: boolean
  refetch: () => Promise<void>
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const load = useCallback(async () => {
    if (!user) {
      setOrders([])
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const data = await fetchMyOrders()
      setOrders(data)
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    load()
  }, [load])

  const value = useMemo(() => ({ orders, loading, refetch: load }), [orders, loading, load])

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrders() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrders must be inside OrderProvider')
  return ctx
}