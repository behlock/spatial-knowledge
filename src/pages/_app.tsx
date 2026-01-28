import Script from 'next/script'
import { CookiesProvider } from 'react-cookie'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import '@/styles/global.scss'
import { config } from '@/utils/config'

// @ts-ignore
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src={config.STATS_TRACKING_URL} strategy="lazyOnload" />
      <TooltipPrimitive.Provider delayDuration={200}>
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      </TooltipPrimitive.Provider>
    </>
  )
}

export default MyApp
