import { useEffect, useRef, useState } from 'react'

export function useContainerWidth<T extends HTMLElement>(initial = 600): [
  React.RefObject<T | null>,
  number,
] {
  const ref = useRef<T | null>(null)
  const [width, setWidth] = useState(initial)
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    setWidth(el.clientWidth || initial)
    const ro = new ResizeObserver(() => setWidth(el.clientWidth || initial))
    ro.observe(el)
    return () => ro.disconnect()
  }, [initial])
  return [ref, width]
}
