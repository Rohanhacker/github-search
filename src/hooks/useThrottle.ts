import { useEffect, useRef, useState } from "react"

export function useThrottle<T>(value: T, delay: number) {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastExecutedTime = useRef(Date.now())

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const elapsedTime = Date.now() - lastExecutedTime.current
      if (elapsedTime >= delay) {
        setThrottledValue(value)
        lastExecutedTime.current = Date.now()
      }
    }, delay - (Date.now() - lastExecutedTime.current))

    return () => {
      clearTimeout(timeoutId)
    }
  }, [value, delay])

  return throttledValue
}
