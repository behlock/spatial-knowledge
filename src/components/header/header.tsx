import Link from 'next/link'

import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import AlertDialog from '@/components/alert-dialog'

import useDeviceDetect from '@/hooks/useDeviceDetect'

// @ts-ignore
const Header = ({ language, setLanguage }) => {
  const { isMobile } = useDeviceDetect()

  const [cookies, setCookie] = useCookies(['showDialog'])
  let [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    if (cookies.showDialog === undefined) {
      setCookie('showDialog', true, { path: '/' })
    } else {
      setCookie('showDialog', false, { path: '/' })
    }
  })

  return (
    <>
      <header className="z-20 w-fit  text-white">
        <div className="z-20 mb-2 mr-8 flex flex-row flex-wrap space-x-2 font-extrabold">
          <Link href="/">
            <h2>Collective Creation Games</h2>
          </Link>
        </div>
      </header>
      <div className="fixed top-5 right-5 z-20 mb-2 ml-8 flex flex-col items-center justify-center space-y-2 rounded-lg bg-white p-1 ">
        {cookies.showDialog && (
          <AlertDialog
            isOpen={cookies.showDialog === 'true'}
            isMobile={isMobile}
            // language={language}
            // setLanguage={setLanguage}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        )}
        <a href="https://www.youtube.com/@ramichahine8875/videos" target="_blank" rel="noreferrer">
          <svg
            fill="rgb(23 23 23)"
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            className="cursor-pointer"
          >
            <path d="M23,9.71a8.5,8.5,0,0,0-.91-4.13,2.92,2.92,0,0,0-1.72-1A78.36,78.36,0,0,0,12,4.27a78.45,78.45,0,0,0-8.34.3,2.87,2.87,0,0,0-1.46.74c-.9.83-1,2.25-1.1,3.45a48.29,48.29,0,0,0,0,6.48,9.55,9.55,0,0,0,.3,2,3.14,3.14,0,0,0,.71,1.36,2.86,2.86,0,0,0,1.49.78,45.18,45.18,0,0,0,6.5.33c3.5.05,6.57,0,10.2-.28a2.88,2.88,0,0,0,1.53-.78,2.49,2.49,0,0,0,.61-1,10.58,10.58,0,0,0,.52-3.4C23,13.69,23,10.31,23,9.71ZM9.74,14.85V8.66l5.92,3.11C14,12.69,11.81,13.73,9.74,14.85Z" />
          </svg>
        </a>
      </div>
    </>
  )
}

export default Header
