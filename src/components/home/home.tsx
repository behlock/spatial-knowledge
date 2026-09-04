import { useCallback, useMemo, useState } from 'react'
import useSWRImmutable from 'swr/immutable'

import ForceGraph from '@/components/force-graph'
import GraphControls from '@/components/graph-controls'
import Layout from '@/components/layout'
import { defaultVisibleNodeIds, mobileVisibleNodeIds, phases } from '@/data/graph-setup'
import useDeviceDetect from '@/hooks/useDeviceDetect'
import useGraphVisibility from '@/hooks/useGraphVisibility'
import { buildChildrenIndex } from '@/lib/graph'
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
  const [hiddenTags, setHiddenTags] = useState<string[]>([])
  const [isRevealed, setIsRevealed] = useState(false)

  // The data is static, so fetch it once and never revalidate.
  const { data: graphData, error } = useSWRImmutable('/api/graph', fetchGraph)

  const childrenIndex = useMemo(() => (graphData ? buildChildrenIndex(graphData.links) : EMPTY_INDEX), [graphData])

  // Nodes shown before any expansion: a curated subset, or everything once revealed.
  const baseNodeIds = useMemo(() => {
    if (!graphData) return []
    const curated = new Set(isMobile ? mobileVisibleNodeIds : defaultVisibleNodeIds)
    const hidden = new Set(hiddenTags)
    return graphData.nodes
      .filter((node) => isRevealed || curated.has(node.id))
      .filter((node) => !node.tags?.some((tag) => hidden.has(tag)))
      .map((node) => node.id)
  }, [graphData, isMobile, isRevealed, hiddenTags])

  const { visibleNodeIds, clickedNodeIds, highlightedNodeId, toggleNode } = useGraphVisibility(
    baseNodeIds,
    childrenIndex,
  )

  const toggleTag = useCallback((tag: string) => {
    setHiddenTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }, [])

  const toggleReveal = useCallback(() => setIsRevealed((prev) => !prev), [])

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 text-center text-sm">
        An unexpected error occurred, please try refreshing the page. If the error persists, reach out to us at
        rami.o.chahine@gmail.com
      </div>
    )
  }

  return (
    <Layout>
      {!isMobile && (
        <GraphControls
          phases={phases}
          hiddenTags={hiddenTags}
          onToggleTag={toggleTag}
          isRevealed={isRevealed}
          onToggleReveal={toggleReveal}
          revealLabel="Reveal"
        />
      )}
      <ForceGraph
        graphData={graphData ?? EMPTY_GRAPH}
        visibleNodeIds={visibleNodeIds}
        clickedNodeIds={clickedNodeIds}
        highlightedNodeId={highlightedNodeId}
        onNodeClick={isMobile ? undefined : toggleNode}
      />
    </Layout>
  )
}
