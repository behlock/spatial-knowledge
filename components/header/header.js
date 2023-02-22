import Link from 'next/link'

import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

import AlertDialog from 'components/alert-dialog'

export const Header = () => {
  const [cookies, setCookie] = useCookies(['showDialog'])

  useEffect(() => {
    if (cookies.showDialog === undefined) {
      setCookie('showDialog', true, { path: '/' })
    } else {
      setCookie('showDialog', false, { path: '/' })
    }
  })

  return (
    <header>
      <div className="font-bold mb-2 flex flex-row space-x-1">
        <Link href="/">
          <h3>Collective Creation Games</h3>
        </Link>
        {cookies.showDialog && <AlertDialog isOpen={cookies.showDialog === 'true'} />}
      </div>
    </header>
  )
}
