import { ClientOnly } from 'components/isomorphic'
import { content } from 'content/content'
import { Layout } from 'layouts/default'

export default function Home({ footer }) {
  // const isDesktop = useMediaQuery('(min-width: 800px)')

  return (
    <Layout footerLinks={footer.links}>
      {/* {!isDesktop ? <LayoutMobile  /> : <ClientOnly />} */}
      <ClientOnly />
    </Layout>
  )
}

export async function getStaticProps() {
  const footer = {
    links: content.footerLinks,
  }
  return {
    props: {
      footer,
    },
  }
}
