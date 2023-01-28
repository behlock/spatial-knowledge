import dynamic from 'next/dynamic'

import { ClientOnly } from 'components/isomorphic'
import { content } from 'content/content'
import miserables from 'content/miserables.json'
import { Layout } from 'layouts/default'

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
})

export default function Home({ footer }) {
  // const isDesktop = useMediaQuery('(min-width: 800px)')

  return (
    <Layout footerLinks={footer.links}>
      {/* {!isDesktop ? <LayoutMobile  /> : <ClientOnly />} */}
      <ForceGraph2D
        graphData={miserables}
        nodeId="id"
        nodeVal="group"
        nodeTitle="id"
        linkWidth="value"
        width={1152}
        height={600}
        nodeColor={(node) => {}}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={1}
        linkDirectionalParticleSpeed={0.01}
        linkDirectionalParticleColor={(link) => {
          if (link.value > 0.5) {
            return 'red'
          } else {
            return 'blue'
          }
        }}
        nodeLabel={(node) => {
          return node.id
        }}
      />

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
