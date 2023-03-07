/* eslint-disable @next/next/no-document-import-in-page */
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <link href="/fonts/Inter-Light.ttf" as="font" rel="preload prefetch" type="font/ttf" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
