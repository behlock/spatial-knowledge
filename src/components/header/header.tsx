import { Dispatch, SetStateAction } from 'react'

import { Language } from '@/modules/language'

interface HeaderProps {
  language: Language
  setLanguage: Dispatch<SetStateAction<Language>>
}

const Header = ({ language, setLanguage }: HeaderProps) => {
  return <></>
}

export default Header
