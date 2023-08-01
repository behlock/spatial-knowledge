import Script from 'next/script'
import { CookiesProvider } from 'react-cookie'

import '@/styles/global.scss'
import { config } from '@/utils/config'

// @ts-ignore
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src={config.STATS_TRACKING_URL} />
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </>
  )
}

export default MyApp
