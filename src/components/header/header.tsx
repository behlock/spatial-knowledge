import Link from 'next/link'
import { Dispatch, SetStateAction, useState } from 'react'

import AlertDialog from '@/components/alert-dialog'
import { Language } from '@/modules/language'
import useDeviceDetect from '@/hooks/useDeviceDetect'

interface HeaderProps {
  language: Language
  setLanguage: Dispatch<SetStateAction<Language>>
}

const Header = ({ language, setLanguage }: HeaderProps) => {
  const { isMobile } = useDeviceDetect()
  const [infoPageNumber, setInfoPageNumber] = useState(1)
  const [aboutPageNumber, setAboutPageNumber] = useState(1)
  const [howToPageNumber, setHowToPageNumber] = useState(1)

  return (
    <>
      <header className="z-20 w-fit">
        <div className="z-20 mb-2 mr-8 flex flex-row flex-wrap space-x-2">
          <Link href="/">
            <h1 className="text-lg font-mono text-foreground">
              Collective Creation Games
            </h1>
          </Link>
        </div>
      </header>
      <div className="te-panel fixed right-5 top-14 z-20 mb-2 ml-8 flex flex-col items-start justify-center space-y-3 p-3">
        <AlertDialog
          isOpen={false}
          isMobile={isMobile}
          pageNumber={infoPageNumber}
          setPageNumber={setInfoPageNumber}
          section={'info'}
        >
          <span className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer block">
            About
          </span>
        </AlertDialog>
        <AlertDialog
          isOpen={false}
          isMobile={isMobile}
          pageNumber={howToPageNumber}
          setPageNumber={setHowToPageNumber}
          section={'howto'}
        >
          <span className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer block">
            Navigation
          </span>
        </AlertDialog>
        <AlertDialog
          isOpen={false}
          isMobile={isMobile}
          pageNumber={aboutPageNumber}
          setPageNumber={setAboutPageNumber}
          section={'profile'}
        >
          <span className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer block">
            Profile
          </span>
        </AlertDialog>
        <AlertDialog
          isOpen={false}
          isMobile={isMobile}
          pageNumber={infoPageNumber}
          setPageNumber={setInfoPageNumber}
          section={'pictures'}
        >
          <span className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer block">
            Pictures
          </span>
        </AlertDialog>
        <a
          href="https://www.youtube.com/@ramichahine8875/videos"
          target="_blank"
          rel="noreferrer"
          className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer block"
        >
          Youtube
        </a>
      </div>
    </>
  )
}

export default Header
