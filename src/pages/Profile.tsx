import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  Pencil,
  Mail,
  Phone,
  Home,
  Building2,
  MapPin,
  Save,
  Check,
  User,
  Crown
} from 'lucide-react'

export default function Profile() {
  const { user } = useAuth()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(user)
  const [saving, setSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  if (!user) return null

  async function save() {
    setSaving(true)
    await new Promise(res => setTimeout(res, 500))
    
    try {
      const raw = localStorage.getItem('malli_mock_db_v1')
      if (!raw) return
      
      const db = JSON.parse(raw)
      db.users[user.email] = { ...db.users[user.email], ...form }
      
      localStorage.setItem('malli_mock_db_v1', JSON.stringify(db))
      localStorage.setItem('malli_user_v1', JSON.stringify(form))
      
      setEditing(false)
      setShowSuccess(true)
      
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  function handleCancel() {
    setForm(user)
    setEditing(false)
  }

  const initials = user.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || '??'

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-bounce z-50">
          <Check className="w-5 h-5" />
          <span className="font-semibold">Profile updated successfully!</span>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your personal information</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-linear-to-r from-[#5a4545] to-[#806161] h-32 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-[#755757] shadow-xl border-4 border-white">
              {initials}
            </div>
          </div>

          <div className="absolute top-4 right-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                user.role === 'admin'
                  ? 'bg-yellow-400 text-yellow-900'
                  : 'bg-[#b6b6b6] text-[#755757]'
              }`}
            >
              {user.role === 'admin' ? (
                <>
                  <Crown className="w-3 h-3" /> Admin
                </>
              ) : (
                <>
                  <User className="w-3 h-3" /> User
                </>
              )}
            </span>
          </div>
        </div>

        <div className="pt-20 px-8 pb-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>

          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>

            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#755757] to-[#5a4242] text-white rounded-lg hover:bg-[#6b4f4f] transition-all hover:scale-105 active:scale-95"
              >
                <Pencil className="w-4 h-4" />
                <span className="font-semibold">Edit Profile</span>
              </button>
            )}
          </div>

          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              {editing ? (
                <input
                  type="text"
                  value={form?.name || ''}
                  onChange={e => setForm({ ...form!, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                  {user.name || 'Not provided'}
                </div>
              )}
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-600 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
                <span className="ml-auto text-xs bg-gray-200 px-2 py-1 rounded">Read-only</span>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              {editing ? (
                <input
                  type="tel"
                  value={form?.phone || ''}
                  onChange={e => setForm({ ...form!, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{user.phone || 'Not provided'}</span>
                </div>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address
              </label>
              {editing ? (
                <input
                  type="text"
                  value={form?.address || ''}
                  onChange={e => setForm({ ...form!, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your address"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  <span>{user.address || 'Not provided'}</span>
                </div>
              )}
            </div>

            {/* City + ZIP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={form?.city || ''}
                    onChange={e => setForm({ ...form!, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your city"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>{user.city || 'Not provided'}</span>
                  </div>
                )}
              </div>

              {/* ZIP */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Zip Code
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={form?.zipCode || ''}
                    onChange={e => setForm({ ...form!, zipCode: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter zip code"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{user.zipCode || 'Not provided'}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {editing && (
            <div className="flex gap-3 mt-8 pt-6 border-t">
              <button
                onClick={save}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 font-semibold"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCancel}
                disabled={saving}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-semibold disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Account Stats */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            <span>Account Stats</span>
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Member Since</span>
              <span className="font-semibold">Jan 2024</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Total Orders</span>
              <span className="font-semibold">0</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Account Status</span>
              <span className="font-semibold text-green-600">Active</span>
            </div>
          </div>
        </div>

        {/* Security */}
        {/* <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            <span>Security</span>
          </h3>

          <div className="space-y-3">
            <button className="w-full text-left px-4 py-2 bg-black rounded-lg hover:bg-gray-50 transition flex items-center justify-between">
              <span className="text-gray-700 flex items-center gap-2">
                Change Password
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button className="w-full text-left px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition flex items-center justify-between">
              <span className="text-gray-700 flex items-center gap-2">
                Two-Factor Auth
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  )
}
