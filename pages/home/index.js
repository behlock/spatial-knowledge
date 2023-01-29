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
      <ClientOnly />
      <ForceGraph2D
        graphData={miserables}
        // width={1152}
        // height={600}
        backgroundColor="white"
        nodeColor={(node) => {
          if (node.group === 1) {
            return 'red'
          } else {
            return 'blue'
          }
        }}
        nodeRelSize={4}
        linkWidth={1}
        linkColor={(link) => {
          if (link.value > 0.5) {
            return 'red'
          } else {
            return 'blue'
          }
        }}
        onNodeClick={(node) => {
          console.log(node)
        }}
        nodeVal={(node) => {
          node.group
        }}
        nodeLabel={(node) => {
          return node.id
        }}
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
