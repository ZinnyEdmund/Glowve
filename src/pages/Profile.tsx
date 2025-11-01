import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Profile(){
  const { user } = useAuth()
  const [editing,setEditing] = useState(false)
  const [form,setForm] = useState(user)
  if (!user) return null

  function save(){
    // demo: store in local storage user object
    const raw = localStorage.getItem('malli_mock_db_v1')
    if (!raw) return
    const db = JSON.parse(raw)
    if (!user) return;
    db.users[user.email] = { ...db.users[user.email], ...form }
    localStorage.setItem('malli_mock_db_v1', JSON.stringify(db))
    localStorage.setItem('malli_user_v1', JSON.stringify(form))
    setEditing(false)
    alert('Profile updated')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>
      <div className="bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">Personal Info</h3>
          <button onClick={()=>setEditing(!editing)} className="px-3 py-1 bg-blue-600 text-white rounded">{editing? 'Cancel':'Edit'}</button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Name</label>
            {editing ? <input value={form?.name||''} onChange={e=>setForm({...form!, name:e.target.value})} className="w-full border px-3 py-2"/> : <p>{user.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <p>{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            {editing ? <input value={form?.phone||''} onChange={e=>setForm({...form!, phone:e.target.value})} className="w-full border px-3 py-2"/> : <p>{user.phone}</p>}
          </div>
        </div>

        {editing && <button onClick={save} className="mt-4 px-4 py-2 bg-green-600 text-white rounded">Save Changes</button>}
      </div>
    </div>
  )
}
