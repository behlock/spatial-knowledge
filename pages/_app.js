import { CookiesProvider } from 'react-cookie'

import 'styles/global.scss'

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  )
}

export default MyApp
