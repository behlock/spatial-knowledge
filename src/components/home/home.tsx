import { useCallback, useMemo, useState } from 'react'
import useSWRImmutable from 'swr/immutable'

import ForceGraph from '@/components/force-graph'
import GraphControls from '@/components/graph-controls'
import Layout from '@/components/layout'
import { arabicDefaultVisibleNodesIds, arabicDuringSessionNodesIds } from '@/data/arabic-graph-setup'
import {
  englishCreativeProcessNodesIds,
  englishDefaultVisibleNodesIds,
  englishPhases,
} from '@/data/english-graph-setup'
import useDeviceDetect from '@/hooks/useDeviceDetect'
import useGraphVisibility from '@/hooks/useGraphVisibility'
import { buildChildrenIndex } from '@/lib/graph'
import { Language, isEnglish, localeOf } from '@/modules/language'
import type { GraphData } from '@/types/graph'

const EMPTY_GRAPH: GraphData = { nodes: [], links: [] }
const EMPTY_INDEX = new Map<string, string[]>()

async function fetchGraph(url: string): Promise<GraphData> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Request to ${url} failed with status ${response.status}`)
  return response.json()
}

export default function Home() {
  const { isMobile } = useDeviceDetect()
  const [language] = useState(Language.English)
  const [hiddenTags, setHiddenTags] = useState<string[]>([])
  const [isRevealed, setIsRevealed] = useState(false)

  // Only the active language is fetched; the data is static so never revalidate it.
  const { data: graphData, error } = useSWRImmutable(`/api/graph/${localeOf(language)}`, fetchGraph)

  const childrenIndex = useMemo(() => (graphData ? buildChildrenIndex(graphData.links) : EMPTY_INDEX), [graphData])

  // Nodes shown before any expansion: a curated subset, or everything once revealed.
  const baseNodeIds = useMemo(() => {
    if (!graphData) return []
    const english = isEnglish(language)
    const curated = isMobile
      ? english
        ? englishCreativeProcessNodesIds
        : arabicDuringSessionNodesIds
      : english
        ? englishDefaultVisibleNodesIds
        : arabicDefaultVisibleNodesIds
    const curatedSet = new Set(curated)
    const hidden = new Set(hiddenTags)
    return graphData.nodes
      .filter((node) => isRevealed || curatedSet.has(node.id))
      .filter((node) => !node.tags?.some((tag) => hidden.has(tag)))
      .map((node) => node.id)
  }, [graphData, language, isMobile, isRevealed, hiddenTags])

  const { visibleNodeIds, clickedNodeIds, clickedNodeIdSet, toggleNode } = useGraphVisibility(
    baseNodeIds,
    childrenIndex,
  )

  const toggleTag = useCallback((tag: string) => {
    setHiddenTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }, [])

  const toggleReveal = useCallback(() => setIsRevealed((prev) => !prev), [])

  if (error) {
    return (
      <div className="flex h-full items-center justify-center bg-neutral-900 text-sm text-white">
        An unexpected error occurred, please try refreshing the page. If the error persists, reach out to us at
        rami.o.chahine@gmail.com
      </div>
    )
  }

  return (
    <Layout>
      {!isMobile && (
        <GraphControls
          phases={englishPhases}
          hiddenTags={hiddenTags}
          onToggleTag={toggleTag}
          isRevealed={isRevealed}
          onToggleReveal={toggleReveal}
          revealLabel={isEnglish(language) ? 'Reveal' : 'كشف'}
        />
      )}
      <ForceGraph
        graphData={graphData ?? EMPTY_GRAPH}
        visibleNodeIds={visibleNodeIds}
        clickedNodeIds={clickedNodeIdSet}
        highlightedNodeId={clickedNodeIds[0]}
        onNodeClick={isMobile ? undefined : toggleNode}
      />
    </Layout>
  )
}
