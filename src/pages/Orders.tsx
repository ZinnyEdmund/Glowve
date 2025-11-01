// import React from 'react'
import type { Order } from '../types'

export default function Orders(){
  const orders: Order[] = JSON.parse(localStorage.getItem('malli_mock_db_v1') || '{}')?.orders || []
  if (!orders || orders.length===0) return (<div className="text-center py-12">No orders yet</div>)
  return (
    <div className="space-y-4">
      {orders.map(o=>(
        <div key={o.id} className="bg-white p-4 rounded shadow">
          <div className="flex justify-between"><div><p className="text-sm text-gray-600">Order ID</p><p className="font-bold">{o.id}</p></div><div className="text-right"><p className="text-sm text-gray-600">Total</p><p className="font-bold">${o.total.toFixed(2)}</p></div></div>
          <div className="mt-2 border-t pt-2">
            {o.items.map(i=> <div key={i.id} className="flex justify-between text-sm"><span>{i.name} x{i.quantity}</span><span>${(i.price*i.quantity).toFixed(2)}</span></div>)}
          </div>
        </div>
      ))}
    </div>
  )
}
