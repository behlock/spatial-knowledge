import { ForceGraph } from 'components/force-graph'
import mindmap from 'content/mindmap.json'
import { Layout } from 'layouts/default'
import s from './home.module.scss'

export default function Home({ footer }) {
  return (
    <Layout className={s.home}>
      <ForceGraph graphData={mindmap} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
