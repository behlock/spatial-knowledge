import dynamic from 'next/dynamic'
import { useState } from 'react'
import SpriteText from 'three-spritetext'

import { ClientOnly } from 'components/isomorphic'
import { content } from 'content/content'
import miserables from 'content/miserables.json'
import { Layout } from 'layouts/default'

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
})

export default function Home({ footer }) {
  // const isDesktop = useMediaQuery('(min-width: 800px)')

  // store state of hidden nodes

  const [hiddenNodes, setHiddenNodes] = useState([])

  return (
    <Layout footerLinks={footer.links}>
      {/* {!isDesktop ? <LayoutMobile  /> : <ClientOnly />} */}
      <ClientOnly />
      <ForceGraph3D
        // DATA
        graphData={miserables}
        // CONTAINER
        backgroundColor="black"
        // NODES
        nodeRelSize={8}
        nodeVal={(node) => {
          node.group
        }}
        nodeLabel={() => ''}
        nodeThreeObject={(node) => {
          const sprite = new SpriteText(node.id)
          sprite.color = node.color
          sprite.textHeight = 8
          return sprite
        }}
        nodeAutoColorBy="group"
        onNodeClick={(node) => {
          if (hiddenNodes.includes(node.id)) {
            setHiddenNodes(hiddenNodes.filter((id) => id !== node.id))
          } else {
            setHiddenNodes([...hiddenNodes, node.id])
          }
        }}
        nodeVisibility={(node) => {
          return !hiddenNodes.includes(node.id)
        }}
        // LINKS
        // linkWidth={2}
        linkColor="black"
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.25}
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
