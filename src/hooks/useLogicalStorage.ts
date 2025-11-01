import { useState } from 'react'

export function useLocalStorage<T>(key:string, initial:T){
  const [state,setState] = useState<T>(()=>{
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : initial
  })
  function set(value:T){
    setState(value)
    localStorage.setItem(key, JSON.stringify(value))
  }
  return [state,set] as const
}
