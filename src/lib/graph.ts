import type { GraphLink, GraphNode } from '@/types/graph'

type Endpoint = GraphLink['source']

/** Resolve a link endpoint to its node id, whether or not the force engine has replaced it with a node object. */
export const endpointId = (endpoint: Endpoint): string => (typeof endpoint === 'string' ? endpoint : endpoint.id)

/** Build a parent id → direct child ids lookup. Build it once per link set and reuse it. */
export function buildChildrenIndex(links: GraphLink[]): Map<string, string[]> {
  const index = new Map<string, string[]>()
  for (const link of links) {
    const source = endpointId(link.source)
    const target = endpointId(link.target)
    const children = index.get(source)
    if (children) {
      children.push(target)
    } else {
      index.set(source, [target])
    }
  }
  return index
}

/** Every descendant id of `nodeId` (excluding itself). Safe on cyclic data. */
export function getDescendantIds(index: Map<string, string[]>, nodeId: string): string[] {
  const seen = new Set<string>()
  const stack = [...(index.get(nodeId) ?? [])]
  while (stack.length > 0) {
    const id = stack.pop()
    if (id === undefined || id === nodeId || seen.has(id)) continue
    seen.add(id)
    const children = index.get(id)
    if (children) stack.push(...children)
  }
  return [...seen]
}

export const isGraphNode = (value: unknown): value is GraphNode =>
  typeof value === 'object' && value !== null && typeof (value as GraphNode).id === 'string'
