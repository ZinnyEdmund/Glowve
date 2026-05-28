import { useState, useEffect, memo } from "react"

interface TimeLeft {
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(deadline: Date): TimeLeft {
  const diff = Math.max(0, deadline.getTime() - Date.now())
  return {
    hours: Math.floor(diff / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  }
}

function pad(n: number): string {
  return String(n).padStart(2, "0")
}

interface CountdownTimerProps {
  /** ISO date string or Date. Defaults to 48h from first render. */
  deadline?: string | Date
}

/**
 * CountdownTimer
 * Live countdown displayed inside PromoBanner.
 * Ticks every second. Cleans up on unmount.
 */
const CountdownTimer = memo(({ deadline }: CountdownTimerProps) => {
  const [target] = useState<Date>(() => {
    if (deadline) return new Date(deadline)
    const d = new Date()
    d.setHours(d.getHours() + 48)
    return d
  })

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1_000)
    return () => clearInterval(id)
  }, [target])

  const units = [
    { label: "hrs", value: pad(timeLeft.hours) },
    { label: "min", value: pad(timeLeft.minutes) },
    { label: "sec", value: pad(timeLeft.seconds) },
  ]

  return (
    <div className="flex items-center gap-2" aria-label="Time remaining for offer">
      {units.map(({ label, value }, i) => (
        <span key={label} className="flex items-center gap-2">
          <span className="flex flex-col items-center">
            <span
              className="text-2xl font-black tabular-nums leading-none text-white"
              aria-live={label === "sec" ? "polite" : undefined}
              aria-atomic="true"
            >
              {value}
            </span>
            <span className="text-[10px] text-white/50 uppercase tracking-widest mt-0.5">
              {label}
            </span>
          </span>
          {i < units.length - 1 && (
            <span className="text-white/30 text-xl font-light pb-3">:</span>
          )}
        </span>
      ))}
    </div>
  )
})

CountdownTimer.displayName = "CountdownTimer"
export default CountdownTimer