export interface GraphNode {
  id: string
  tags?: string[]
  color?: string
  portalTo?: string
  videoUrl?: string
}

/**
 * Link endpoints start out as node ids. Once the graph has been rendered the
 * force engine replaces them with references to the node objects themselves,
 * so consumers must handle both shapes (see `endpointId` in `@/lib/graph`).
 */
export interface GraphLink {
  source: string | GraphNode
  target: string | GraphNode
}

export interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

export interface Phase {
  /** Short label shown in the filter bar. */
  label: string
  /** The exact tag value used in the node data. */
  official: string
}
