import dynamic from 'next/dynamic'
import { memo, useCallback } from 'react'
import SpriteText from 'three-spritetext'

import { endpointId, isGraphNode } from '@/lib/graph'
import type { GraphData } from '@/types/graph'

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), { ssr: false })

const BACKGROUND_COLOR = '#171717'
const DEFAULT_NODE_COLOR = '#ffffff'
const HIGHLIGHT_NODE_COLOR = 'rgba(228, 255, 0, 1)'
const LABEL_COLOR = 'rgba(255, 255, 255, 0.9)'
const LINK_COLOR = 'rgba(255, 255, 255, 0.3)'
const ACTIVE_LINK_COLOR = 'white'

interface ForceGraphProps {
  graphData: GraphData
  visibleNodeIds: ReadonlySet<string>
  clickedNodeIds: ReadonlySet<string>
  /** The node drawn in the highlight colour (the first node the user expanded). */
  highlightedNodeId?: string
  /** Omit to make the graph read-only. */
  onNodeClick?: (nodeId: string) => void
}

// react-force-graph-3d hands back loosely typed objects; narrow them once here.
type AnyNode = { id?: string | number; color?: unknown }
type AnyLink = { source?: unknown; target?: unknown }

const nodeIdOf = (node: AnyNode): string => String(node.id ?? '')
const linkEndpointId = (endpoint: unknown): string =>
  typeof endpoint === 'string' || isGraphNode(endpoint) ? endpointId(endpoint) : String(endpoint ?? '')

// Labels never change, so keep this callback stable: a new identity makes the
// library rebuild every node object in the scene.
const nodeThreeObject = (node: AnyNode) => {
  const sprite = new SpriteText(nodeIdOf(node))
  sprite.textHeight = 6
  sprite.fontSize = 25
  sprite.color = LABEL_COLOR
  return sprite
}

const noLabel = () => ''

function ForceGraphComponent({
  graphData,
  visibleNodeIds,
  clickedNodeIds,
  highlightedNodeId,
  onNodeClick,
}: ForceGraphProps) {
  const nodeVisibility = useCallback((node: AnyNode) => visibleNodeIds.has(nodeIdOf(node)), [visibleNodeIds])

  // The library only hides nodes, not the links attached to them, so filter those here too.
  const linkVisibility = useCallback(
    (link: AnyLink) =>
      visibleNodeIds.has(linkEndpointId(link.source)) && visibleNodeIds.has(linkEndpointId(link.target)),
    [visibleNodeIds],
  )

  const nodeColor = useCallback(
    (node: AnyNode) => {
      if (highlightedNodeId !== undefined && nodeIdOf(node) === highlightedNodeId) return HIGHLIGHT_NODE_COLOR
      return typeof node.color === 'string' ? node.color : DEFAULT_NODE_COLOR
    },
    [highlightedNodeId],
  )

  const linkWidth = useCallback(
    (link: AnyLink) => (clickedNodeIds.has(linkEndpointId(link.source)) ? 3 : 1),
    [clickedNodeIds],
  )

  const linkColor = useCallback(
    (link: AnyLink) => (clickedNodeIds.has(linkEndpointId(link.source)) ? ACTIVE_LINK_COLOR : LINK_COLOR),
    [clickedNodeIds],
  )

  const handleNodeClick = useCallback((node: AnyNode) => onNodeClick?.(nodeIdOf(node)), [onNodeClick])

  return (
    <div className="fixed top-0 left-0 z-10 h-full w-full">
      <ForceGraph3D
        d3AlphaDecay={0.03}
        graphData={graphData}
        nodeId="id"
        linkSource="source"
        linkTarget="target"
        backgroundColor={BACKGROUND_COLOR}
        showNavInfo={false}
        nodeRelSize={10}
        nodeLabel={noLabel}
        nodeThreeObject={nodeThreeObject}
        nodeThreeObjectExtend
        nodeColor={nodeColor}
        nodeVisibility={nodeVisibility}
        nodeOpacity={0.5}
        nodeResolution={32}
        onNodeClick={onNodeClick ? handleNodeClick : undefined}
        linkVisibility={linkVisibility}
        linkWidth={linkWidth}
        linkColor={linkColor}
        linkOpacity={0.5}
      />
    </div>
  )
}

const ForceGraph = memo(ForceGraphComponent)

export default ForceGraph
