import CustomHead from '@/components/custom-head/custom-head'
import dynamic from 'next/dynamic'

const Header = dynamic(() => import('@/components/header'), {
  ssr: false,
})

function Layout({
  seo = {
    title: 'Collective Creation Games',
    description: 'Space to share experiments',
    keywords: ['Collective Creation Games', 'Rami Chahine', 'Walid Behlock'],
  },
  children = null,
}) {
  return (
    <>
      <CustomHead {...seo} />
      <div className="flex bg-neutral-900 p-5">
        <main className="flex flex-grow flex-col overflow-hidden bg-neutral-900">{children}</main>
      </div>
    </>
  )
}

export default Layout
