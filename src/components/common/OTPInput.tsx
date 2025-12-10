import { useState, useRef } from 'react'
import type { KeyboardEvent, ClipboardEvent } from 'react'

type Props = {
  length?: number
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export default function OTPInput({ length = 6, value, onChange, disabled = false }: Props) {
  const [focused, setFocused] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, digit: string) => {
    if (!/^\d*$/.test(digit)) return

    const newValue = value.split('')
    newValue[index] = digit
    const otpValue = newValue.join('')

    onChange(otpValue)

    // Move to next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('text').slice(0, length)
    if (/^\d+$/.test(pasteData)) {
      onChange(pasteData)
      inputRefs.current[Math.min(pasteData.length, length - 1)]?.focus()
    }
  }

  return (
    <div className="flex gap-3 justify-center">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={el => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={e => handleChange(index, e.target.value)}
          onKeyDown={e => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          className={`w-12 h-14 text-center text-2xl font-bold border-2 rounded-lg transition-all ${
            focused && !value[index]
              ? 'border-blue-500 ring-2 ring-blue-200'
              : value[index]
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
        />
      ))}
    </div>
  )
}