import { useSyncExternalStore } from 'react'

const MOBILE_USER_AGENT = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

// The user agent never changes during a session, so there is nothing to subscribe to.
const subscribe = () => () => {}
const getSnapshot = () => MOBILE_USER_AGENT.test(navigator.userAgent)
const getServerSnapshot = () => false

/** `isMobile` is `false` during SSR and hydration, then reflects the real device. */
export default function useDeviceDetect() {
  const isMobile = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return { isMobile }
}
