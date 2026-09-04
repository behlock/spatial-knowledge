import { getDescendantIds } from '@/lib/graph'

/**
 * The user's expand / collapse edits on top of a base set of visible nodes.
 *
 * Edits are recorded against the base they were made on. When the base changes
 * (reveal toggle, tag filter, device, language) the edits no longer apply and are
 * discarded, which resets the view without any effect or explicit reset call.
 */
export interface GraphEdits {
  base: readonly string[]
  /** Nodes revealed on top of the base set. */
  added: ReadonlySet<string>
  /** Nodes hidden from the base set. */
  removed: ReadonlySet<string>
  /** Nodes the user has expanded, in click order. The first one is highlighted. */
  clicked: readonly string[]
}

export const emptyEdits = (base: readonly string[]): GraphEdits => ({
  base,
  added: new Set(),
  removed: new Set(),
  clicked: [],
})

/** Edits only count if they were made against the current base set. */
export const editsFor = (edits: GraphEdits, base: readonly string[]): GraphEdits =>
  edits.base === base ? edits : emptyEdits(base)

export function visibleNodeIds(edits: GraphEdits): Set<string> {
  const ids = new Set(edits.base)
  edits.added.forEach((id) => ids.add(id))
  edits.removed.forEach((id) => ids.delete(id))
  return ids
}

/**
 * - Clicking a collapsed node reveals its direct children.
 * - Clicking an expanded node hides all of its descendants and collapses them too.
 * - A leaf node toggles its own visibility, since it has nothing to reveal.
 */
export function toggleNode(edits: GraphEdits, childrenIndex: Map<string, string[]>, nodeId: string): GraphEdits {
  const added = new Set(edits.added)
  const removed = new Set(edits.removed)

  if (edits.clicked.includes(nodeId)) {
    const descendants = getDescendantIds(childrenIndex, nodeId)
    const toHide = descendants.length > 0 ? descendants : [nodeId]
    for (const id of toHide) {
      removed.add(id)
      added.delete(id)
    }
    const hidden = new Set(toHide)
    return { ...edits, added, removed, clicked: edits.clicked.filter((id) => id !== nodeId && !hidden.has(id)) }
  }

  const children = childrenIndex.get(nodeId) ?? []
  const toShow = children.length > 0 ? children : [nodeId]
  for (const id of toShow) {
    added.add(id)
    removed.delete(id)
  }
  return { ...edits, added, removed, clicked: [...edits.clicked, nodeId] }
}
