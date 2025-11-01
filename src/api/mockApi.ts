import type { Product, User, Order } from '../types'

const KEY = 'malli_mock_db_v1'

type UserWithPassword = User & { password: string }
type ProductWithSold = Product & { sold: number }
type DB = { 
  users: Record<string, UserWithPassword>
  products: ProductWithSold[]
  orders: Order[] 
}

const initial: DB = {
  users: {
    'demo@example.com': { 
      email: 'demo@example.com', 
      name: 'Admin Demo', 
      role: 'admin', 
      phone: '(555) 123-4567', 
      address: '123 Main St', 
      city: 'San Francisco', 
      zipCode: '94105', 
      password: 'Demo123!' 
    },
    'john@example.com': { 
      email: 'john@example.com', 
      name: 'John Doe', 
      role: 'user', 
      phone: '(555) 987-6543', 
      address: '456 Oak Ave', 
      city: 'New York', 
      zipCode: '10001', 
      password: 'John123!' 
    }
  },
  products: [
    {
      id: 1, 
      name: 'Premium Wireless Headphones', 
      price: 129.99, 
      category: 'Electronics', 
      image: '🎧', 
      description: 'High-quality sound with noise cancellation', 
      stock: 15,
      sold: 42  
    },
    {
      id: 2, 
      name: 'Smart Watch', 
      price: 199.99, 
      category: 'Electronics', 
      image: '⌚', 
      description: 'Track fitness and stay connected', 
      stock: 8,
      sold: 38  
    },
    {
      id: 3, 
      name: 'Portable Charger', 
      price: 49.99, 
      category: 'Accessories', 
      image: '🔋', 
      description: '20000mAh power bank', 
      stock: 25, 
      sold: 65  
    },
    {
      id: 4, 
      name: 'USB-C Cable', 
      price: 19.99, 
      category: 'Accessories', 
      image: '🔌', 
      description: 'Durable 2m USB-C cable', 
      stock: 50, 
      sold: 120  
    },
    {
      id: 5, 
      name: 'Phone Stand', 
      price: 24.99, 
      category: 'Accessories', 
      image: '📱', 
      description: 'Adjustable phone stand', 
      stock: 30, 
      sold: 45  
    },
    {
      id: 6, 
      name: 'Wireless Mouse', 
      price: 39.99, 
      category: 'Electronics', 
      image: '🖱️', 
      description: 'Ergonomic wireless mouse', 
      stock: 20, 
      sold: 28  
    }
  ],
  orders: []
}

function loadDB(): DB {
  const raw = localStorage.getItem(KEY)
  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify(initial))
    return JSON.parse(JSON.stringify(initial))
  }
  return JSON.parse(raw)
}

function saveDB(db: DB) { 
  localStorage.setItem(KEY, JSON.stringify(db)) 
}

function delay(ms = 300) { 
  return new Promise(res => setTimeout(res, ms)) 
}

export async function fetchProducts(): Promise<ProductWithSold[]> {
  await delay(250)
  return loadDB().products
}

export async function login(email: string, password: string): Promise<Omit<User, 'password'>> {
  await delay(250)
  const db = loadDB()
  const u = db.users[email]
  if (!u) throw new Error('User not found')
  if (u.password !== password) throw new Error('Invalid password')
  const { password: _p, ...rest } = u
  void _p
  return rest
}

export async function register(user: UserWithPassword): Promise<Omit<User, 'password'>> {
  await delay(300)
  const db = loadDB()
  if (db.users[user.email]) throw new Error('Email already registered')
  db.users[user.email] = { ...user }
  saveDB(db)
  const { password, ...rest } = user
  void password
  return rest
}

export async function placeOrder(order: Order): Promise<Order> {
  await delay(250)
  const db = loadDB()
  db.orders.push(order)
  saveDB(db)
  return order
}

export async function fetchOrders(): Promise<Order[]> {
  await delay(200)
  return loadDB().orders
}