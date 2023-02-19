import useSWR from 'swr'

import ForceGraph from 'components/force-graph'
import Header from 'components/header'
import Layout from 'components/layout'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
  const { data, error } = useSWR('/api/staticdata', fetcher)

  //Handle the error state
  if (error) return <div>Failed to load</div>
  //Handle the loading state
  if (!data) return <div>Loading...</div>

  return (
    <Layout>
      <Header title="collective creation games" />
      <ForceGraph graphData={JSON.parse(data)} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
