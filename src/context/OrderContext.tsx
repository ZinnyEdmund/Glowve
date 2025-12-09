import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { Order } from '../types/index'
import { useAuth } from './AuthContext'

type OrderContextType = {
  orders: Order[]
  loading: boolean
  addOrder: (order: Order) => void
  updateOrderStatus: (orderId: string, status: Order['status']) => void
  getOrderById: (orderId: string) => Order | undefined
  getUserOrders: () => Order[]
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

const ORDERS_KEY = 'malli_orders_v1'

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  // Load orders from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(ORDERS_KEY)
      if (stored) {
        setOrders(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Save orders to localStorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
    }
  }, [orders, loading])

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev])
  }

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      )
    )
  }

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId)
  }

  const getUserOrders = () => {
    if (!user) return []
    if (user.role === 'admin') return orders
    return orders.filter(order => order.userEmail === user.email)
  }

  const value = useMemo(
    () => ({ orders, loading, addOrder, updateOrderStatus, getOrderById, getUserOrders }),
    [orders, loading, user]
  )

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrders() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrders must be inside OrderProvider')
  return ctx
}