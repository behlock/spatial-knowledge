import { useEffect, useState } from 'react'

const useTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true)
    } else {
      setIsTouchDevice(false)
    }
  }, [])

  return isTouchDevice
}

export default useTouchDevice
