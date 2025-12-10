import { useState } from 'react'
import type { ShippingAddress } from '../../types'
import { COUNTRIES, NIGERIAN_STATES } from '../../utils/constants'
import { validateEmail, validatePhone, validateZipCode } from '../../utils/validators'

type Props = {
  initialData?: Partial<ShippingAddress>
  onSubmit: (data: ShippingAddress) => void
  onBack?: () => void
}

export default function ShippingForm({ initialData, onSubmit, onBack }: Props) {
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: initialData?.fullName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    zipCode: initialData?.zipCode || '',
    country: initialData?.country || 'Nigeria'
  })

  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({})

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingAddress, string>> = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email address'
    if (!validatePhone(formData.phone)) newErrors.phone = 'Invalid phone number'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    if (!validateZipCode(formData.zipCode)) newErrors.zipCode = 'Invalid zip code'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  const handleChange = (field: keyof ShippingAddress, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          value={formData.fullName}
          onChange={e => handleChange('fullName', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#755757] outline-none transition ${
            errors.fullName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="John Doe"
        />
        {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
      </div>

      {/* Email & Phone */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={e => handleChange('email', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#755757] outline-none transition ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="john@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={e => handleChange('phone', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#755757] outline-none transition ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="+234 800 000 0000"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Street Address *
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={e => handleChange('address', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#755757] outline-none transition ${
            errors.address ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="123 Main Street"
        />
        {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
      </div>

      {/* City, State, Zip */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={e => handleChange('city', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#755757] outline-none transition ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Lagos"
          />
          {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            State *
          </label>
          <select
            value={formData.state}
            onChange={e => handleChange('state', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#755757] outline-none transition ${
              errors.state ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select State</option>
            {NIGERIAN_STATES.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Zip Code *
          </label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={e => handleChange('zipCode', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#755757] outline-none transition ${
              errors.zipCode ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="100001"
          />
          {errors.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>}
        </div>
      </div>

      {/* Country */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Country *
        </label>
        <select
          value={formData.country}
          onChange={e => handleChange('country', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#755757] outline-none transition"
        >
          {COUNTRIES.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            ← Back
          </button>
        )}
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-linear-to-r from-[#755757] to-[#5a4242] text-white rounded-lg hover:bg-[#382a2a] transition font-semibold"
        >
          Continue to Payment →
        </button>
      </div>
    </form>
  )
}