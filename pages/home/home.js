import { ForceGraph } from 'components/force-graph/force-graph'
import Header from 'components/header'
import Layout from 'components/layout'
import mindmap from 'content/mindmap.json'

export default function Home() {
  return (
    <Layout>
      <Header title="collective creation games" />
      <ForceGraph graphData={mindmap} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
