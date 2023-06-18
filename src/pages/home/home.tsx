import { useState } from 'react'
import useSWR from 'swr'

import ForceGraph from '@/components/force-graph'
import Header from '@/components/header'
import Layout from '@/components/layout'
import { Language, isEnglish } from '@/modules/language'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {
  const [language, setLanguage] = useState(Language.English)

  let { data: englishData, error: englishDataError } = useSWR('/api/englishData', fetcher)
  let { data: arabicData, error: arabicDataError } = useSWR('/api/arabicData', fetcher)

  // Error state
  if (englishDataError || arabicDataError)
    return (
      <div className="flex h-full items-center justify-center bg-neutral-900 text-white">
        An unexpected error occurred, please try refreshing the page. If the error persists, reach out to us at
        rami.o.chahine@gmail.com
      </div>
    )
  // Loading state
  if (!englishData || !arabicData)
    return <div className="flex h-full items-center justify-center bg-neutral-900 text-white"></div>

  englishData = JSON.parse(englishData)
  arabicData = JSON.parse(arabicData)
  let graphData = isEnglish(language) ? englishData : arabicData

  return (
    // @ts-ignore
    <Layout>
      {/* @ts-ignore */}
      <>
        <Header language={language} setLanguage={setLanguage} />
        <ForceGraph graphData={graphData} language={language} />
      </>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
