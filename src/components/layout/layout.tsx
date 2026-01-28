import CustomHead from '@/components/custom-head/custom-head'

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
      <div className="flex bg-background p-4 font-mono">
        <main className="flex flex-grow flex-col overflow-hidden bg-background text-foreground">{children}</main>
      </div>
    </>
  )
}

export default Layout
