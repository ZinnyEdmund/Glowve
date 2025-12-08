// src/App.tsx
import { Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import AuthLayout from "./layouts/AuthLayout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Orders from "./pages/Orders"
import Analytics from "./pages/Analytics"
import Cart from "./pages/Cart"
import Products from "./pages/Products"
import ProtectedRoute from "./components/ProtectedRoute"

export default function App() {
  return (
    <Routes>
      {/* Auth Routes - No Navbar/Footer */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Main Routes - With Navbar/Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute adminOnly>
              <Analytics />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}