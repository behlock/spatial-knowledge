import { useState } from 'react'
import useSWR from 'swr'

import ForceGraph from '@/components/force-graph'
import Header from '@/components/header'
import Layout from '@/components/layout'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {
  let { data: englishData, error: englishDataError } = useSWR('/api/englishData', fetcher)
  let { data: arabicData, error: arabicDataError } = useSWR('/api/arabicData', fetcher)
  const [english, setEnglish] = useState(true)

  // Handle the error state
  if (englishDataError || arabicDataError)
    return <div className="flex items-center h-full justify-center bg-neutral-900 text-white">Failed to load</div>
  // Handle the loading state
  if (!englishData || !arabicData)
    return <div className="flex items-center h-full justify-center bg-neutral-900 text-white"></div>

  englishData = JSON.parse(englishData)
  arabicData = JSON.parse(arabicData)

  return (
    // @ts-ignore
    <Layout>
      {/* @ts-ignore */}
      <>
        <Header english={english} setEnglish={setEnglish} />
        <ForceGraph englishData={englishData} arabicData={arabicData} isEnglish={english} />
      </>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
