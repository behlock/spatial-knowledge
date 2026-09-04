import type { ReactNode } from 'react'

import CustomHead, { type CustomHeadProps } from '@/components/custom-head'

interface LayoutProps {
  seo?: CustomHeadProps
  children?: ReactNode
}

const DEFAULT_SEO: CustomHeadProps = {
  title: 'Spatial Knowledge',
  description: 'Interactive 3D Knowledge Bases',
  keywords: ['Spatial Knowledge', 'Collective Creation Games', 'Rami Chahine', 'Walid Behlock'],
}

export default function Layout({ seo = DEFAULT_SEO, children }: LayoutProps) {
  return (
    <>
      <CustomHead {...seo} />
      <div className="bg-background flex p-4 font-mono">
        <main className="bg-background text-foreground flex grow flex-col overflow-hidden">{children}</main>
      </div>
    </>
  )
}
