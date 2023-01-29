import cn from 'clsx'
import { CustomHead } from 'components/custom-head'
import dynamic from 'next/dynamic'
import s from './layout.module.scss'

const Header = dynamic(() => import('components/header').then(({ Header }) => Header), {
  ssr: false,
})
const Footer = dynamic(() => import('components/footer').then(({ Footer }) => Footer), {
  ssr: false,
})

export function Layout({
  seo = {
    title: 'collectivecreationgames',
    description: 'Space to share experiments',
    keywords: ['rami', 'chahine', 'games'],
  },
  children,
  theme = 'dark',
  className,
  principles,
  footerLinks,
}) {
  // const isTouchDevice = useIsTouchDevice()
  return (
    <>
      <CustomHead {...seo} />
      <div className={cn(`theme-${theme}`, s.layout, className)}>
        {/* {isTouchDevice === false && <Cursor />} */}
        <Header title="collective creation games" />
        <main className={s.main}>{children}</main>
        <Footer links={footerLinks} />
      </div>
    </>
  )
}
