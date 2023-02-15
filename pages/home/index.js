import { useState } from 'react'

import { ForceGraph } from 'components/force-graph'
import miserables from 'content/miserables.json'
import { Layout } from 'layouts/default'

export default function Home({ footer }) {
  // store state of hidden nodes
  const [visibleNodes, setVisibleNodes] = useState(['Valjean', 'Blacheville', 'Zephine'])
  const [expandedNodes, setExpandedNodes] = useState([])

  return (
    <Layout>
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
  return {
    props: {},
  }
}
