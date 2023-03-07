import useSWR from 'swr'

import ForceGraph from '@/components/force-graph'
import Header from '@/components/header'
import Layout from '@/components/layout'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {
  const { data: englishData, error: englishDataError } = useSWR('/api/englishData', fetcher)
  const { data: arabicData, error: arabicDataError } = useSWR('/api/arabicData', fetcher)

  // Handle the error state
  if (englishDataError || arabicDataError) return <div className="flex items-center justify-center bg-black text-white">Failed to load</div>
  // Handle the loading state
  if (!englishData || !arabicData) return <div className="flex items-center justify-center bg-black text-white">Loading...</div>

  return (
    // @ts-ignore
    <Layout>
      {/* @ts-ignore */}
      <>
        <Header />
        <ForceGraph englishData={JSON.parse(englishData)} arabicData={JSON.parse(arabicData)} />
      </>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
