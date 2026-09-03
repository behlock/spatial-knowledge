import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Script from 'next/script'

import '@/styles/globals.css'
import { config } from '@/utils/config'

// Self-hosted by Next at build time: no request to Google Fonts at runtime.
const inter = Inter({ subsets: ['latin'], display: 'swap' })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style>
      {config.STATS_TRACKING_URL && <Script src={config.STATS_TRACKING_URL} strategy="lazyOnload" />}
      <Component {...pageProps} />
    </>
  )
}
