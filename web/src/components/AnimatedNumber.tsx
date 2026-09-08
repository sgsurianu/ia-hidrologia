import { useEffect, useState } from 'react'

export function AnimatedNumber({
  value,
  decimals = 3,
  suffix = '',
}: {
  value: number
  decimals?: number
  suffix?: string
}) {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const duration = 900
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) ** 3
      setShown(value * eased)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value])

  return (
    <span>
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  )
}
