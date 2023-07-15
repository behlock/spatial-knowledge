import { useEffect, useState } from 'react'
import useSWR from 'swr'

import ForceGraph from '@/components/force-graph'
import Header from '@/components/header'
import Layout from '@/components/layout'
import useDeviceDetect from '@/hooks/useDeviceDetect'
import { Language, isEnglish } from '@/modules/language'

import { arabicDefaultVisibleNodesIds, arabicDuringSessionNodesIds, arabicPhases } from '@/data/arabic-graph-setup'
import {
  englishDefaultVisibleNodesIds,
  englishCreativeProcessNodesIds,
  englishPhases,
} from '@/data/english-graph-setup'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {
  const { isMobile } = useDeviceDetect()
  const [language, setLanguage] = useState(Language.English)
  const [englishGraphData, setEnglishGraphData] = useState({ nodes: [], links: [] })
  const [arabicGraphData, setArabicGraphData] = useState({ nodes: [], links: [] })
  const [graphData, setGraphData] = useState({ nodes: [], links: [] })
  const [phases, setPhases] = useState(englishPhases)

  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isRevealed, setIsRevealed] = useState(false)

  const [defaultVisibleNodes, setDefaultVisibleNodes] = useState([])

  const [duringSessionNodes, setDuringSessionNodes] = useState([])

  const [visibleNodesIds, setVisibleNodesIds] = useState(englishDefaultVisibleNodesIds)
  const [completeSetOfNodes, setCompleteSetOfNodes] = useState([])

  const [clickedNodes, setClickedNodes] = useState([])

  useEffect(() => {
    setGraphData(isEnglish(language) ? englishGraphData : arabicGraphData)
  }, [language, englishGraphData, arabicGraphData])

  useEffect(() => {
    if (graphData.nodes.length === 0) return
    setSelectedTags([])
    // setPhases(isEnglish(language) ? englishPhases : arabicPhases)
    setPhases(englishPhases)

    const defaultVisibleNodesIds = isEnglish(language) ? englishDefaultVisibleNodesIds : arabicDefaultVisibleNodesIds
    setDefaultVisibleNodes(graphData.nodes.filter((node: any) => defaultVisibleNodesIds.includes(node.id)))

    const duringSessionNodesIds = isEnglish(language) ? englishCreativeProcessNodesIds : arabicDuringSessionNodesIds
    setDuringSessionNodes(graphData.nodes.filter((node: any) => duringSessionNodesIds.includes(node.id)))

    setVisibleNodesIds(isMobile ? duringSessionNodesIds : defaultVisibleNodesIds)
  }, [language, graphData])

  useEffect(() => {
    if (isRevealed) {
      setCompleteSetOfNodes(graphData.nodes)
    } else {
      setCompleteSetOfNodes(isMobile ? duringSessionNodes : defaultVisibleNodes)
    }
  }, [isRevealed, isMobile, defaultVisibleNodes])

  // FETCH DATA
  let { data: englishData, error: englishDataError } = useSWR('/api/englishData', fetcher)
  let { data: arabicData, error: arabicDataError } = useSWR('/api/arabicData', fetcher)

  // Error state
  if (englishDataError || arabicDataError)
    return (
      <div className="flex h-full items-center justify-center bg-neutral-900 text-sm text-white">
        An unexpected error occurred, please try refreshing the page. If the error persists, reach out to us at
        rami.o.chahine@gmail.com
      </div>
    )
  // Loading state
  if (!englishData || !arabicData)
    return <div className="flex h-full items-center justify-center bg-neutral-900 text-white"></div>

  if (!englishGraphData.nodes.length) {
    setEnglishGraphData(JSON.parse(englishData))
  }
  if (!arabicGraphData.nodes.length) {
    setArabicGraphData(JSON.parse(arabicData))
  }

  return (
    // @ts-ignore
    <Layout>
      {/* @ts-ignore */}
      <>
        <Header language={language} setLanguage={setLanguage} />
        <ForceGraph
          isMobile={isMobile}
          graphData={graphData}
          phases={phases}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          visibleNodesIds={visibleNodesIds}
          setVisibleNodesIds={setVisibleNodesIds}
          completeSetOfNodes={completeSetOfNodes}
          isRevealed={isRevealed}
          setIsRevealed={setIsRevealed}
          revealCheckboxLabel={isEnglish(language) ? 'Reveal' : 'كشف'}
          clickedNodes={clickedNodes}
          setClickedNodes={setClickedNodes}
        />
      </>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
