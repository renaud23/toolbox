import { useEffect, useRef, useState } from 'react'

export function useAsync<T>(cally: () => Promise<T>) {
  const [result, setResult] = useState<T>()
  const alreadyCalled = useRef(false)

  useEffect(() => {
    if (!alreadyCalled.current) {
      alreadyCalled.current = true
      ;(async () => {
        setResult(await cally())
      })()
    }
  }, [cally])

  return result
}
