import { useState } from 'react'

import { ForceGraph } from 'components/force-graph'
import { ClientOnly } from 'components/isomorphic'
import { content } from 'content/content'
import miserables from 'content/miserables.json'
import { Layout } from 'layouts/default'

export default function Home({ footer }) {
  // const isDesktop = useMediaQuery('(min-width: 800px)')

  // store state of hidden nodes

  const [visibleNodes, setVisibleNodes] = useState(['Valjean', 'Blacheville', 'Zephine'])
  const [expandedNodes, setExpandedNodes] = useState([])

  return (
    <Layout footerLinks={footer.links}>
      {/* {!isDesktop ? <LayoutMobile  /> : <ClientOnly />} */}
      <ClientOnly />
      <ForceGraph
        graphData={miserables}
        visibleNodes={visibleNodes}
        setVisibleNodes={setVisibleNodes}
        expandedNodes={expandedNodes}
        setExpandedNodes={setExpandedNodes}
      />
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
