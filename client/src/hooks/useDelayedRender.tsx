// 3rd party imports
import { useState, useEffect } from 'react'

export const useDelayedRender = (delay: number) => {
  const [delayed, setDelayed] = useState(true)
  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), delay)
    return () => clearTimeout(timeout)
  }, [delay])
  return (fn: any) => !delayed && fn()
}
