import cn from 'clsx'
import { CustomHead } from 'components/custom-head/custom-head'
import dynamic from 'next/dynamic'
import s from './layout.module.scss'

const Header = dynamic(() => import('components/header/header').then(({ Header }) => Header), {
  ssr: false,
})

export function Layout({
  seo = {
    title: 'Collective Creation Games',
    description: 'Space to share experiments',
    keywords: ['rami', 'chahine', 'games'],
  },
  children,
  theme = 'dark',
  className,
}) {
  return (
    <>
      <CustomHead {...seo} />
      <div className={cn(`theme-${theme}`, s.layout, className)}>
        <main className={s.main}>{children}</main>
      </div>
    </>
  )
}
