import type { Order, AnalyticsData } from '../types/index'

export function calculateAnalytics(orders: Order[]): AnalyticsData {
  const totalRevenue = orders
    .filter(o => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.total, 0)

  const totalOrders = orders.length

  const uniqueCustomers = new Set(orders.map(o => o.userEmail)).size

  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  // Revenue by day (last 7 days)
  const revenueByDay = generateRevenueByDay(orders)

  // Top products
  const topProducts = generateTopProducts(orders)

  // Orders by status
  const ordersByStatus = generateOrdersByStatus(orders)

  // Customer growth
  const customerGrowth = generateCustomerGrowth(orders)

  return {
    totalRevenue,
    totalOrders,
    totalCustomers: uniqueCustomers,
    averageOrderValue,
    revenueByDay,
    topProducts,
    ordersByStatus,
    customerGrowth
  }
}

function generateRevenueByDay(orders: Order[]) {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date.toISOString().split('T')[0]
  })

  return last7Days.map(date => {
    const dayOrders = orders.filter(o => 
      o.createdAt.split('T')[0] === date && o.paymentStatus === 'paid'
    )
    const revenue = dayOrders.reduce((sum, o) => sum + o.total, 0)
    
    return { date, revenue }
  })
}

function generateTopProducts(orders: Order[]) {
  const productMap = new Map<string, { sales: number; revenue: number }>()

  orders.forEach(order => {
    if (order.paymentStatus === 'paid') {
      order.items.forEach(item => {
        const existing = productMap.get(item.title) || { sales: 0, revenue: 0 }
        productMap.set(item.title, {
          sales: existing.sales + item.quantity,
          revenue: existing.revenue + (item.price * item.quantity)
        })
      })
    }
  })

  return Array.from(productMap.entries())
    .map(([product, data]) => ({ product, ...data }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
}

function generateOrdersByStatus(orders: Order[]) {
  const statusMap = new Map<string, number>()

  orders.forEach(order => {
    const count = statusMap.get(order.status) || 0
    statusMap.set(order.status, count + 1)
  })

  return Array.from(statusMap.entries()).map(([status, count]) => ({
    status,
    count
  }))
}

function generateCustomerGrowth(orders: Order[]) {
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    return date.toISOString().split('T')[0]
  })

  const customersByDate = new Map<string, Set<string>>()

  orders.forEach(order => {
    const date = order.createdAt.split('T')[0]
    if (!customersByDate.has(date)) {
      customersByDate.set(date, new Set())
    }
    customersByDate.get(date)!.add(order.userEmail)
  })

  let cumulativeCustomers = 0
  return last30Days.map(date => {
    const newCustomers = customersByDate.get(date)?.size || 0
    cumulativeCustomers += newCustomers
    return { date, customers: cumulativeCustomers }
  })
}