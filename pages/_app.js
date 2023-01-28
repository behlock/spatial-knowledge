import { RealViewport } from 'components/real-viewport'
import 'styles/global.scss'

function MyApp({ Component, pageProps }) {
  ;<RealViewport />
  return <Component {...pageProps} />
}

export default MyApp
