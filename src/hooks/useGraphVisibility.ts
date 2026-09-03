import { useCallback, useMemo, useState } from 'react'

import { getDescendantIds } from '@/lib/graph'

/**
 * User edits (expanded / collapsed nodes) are recorded against the base set they were made on.
 * When the base set changes (language, device, reveal toggle, tag filter) the edits no longer
 * apply and are ignored, which resets the view without needing an effect.
 */
interface Edits {
  base: readonly string[]
  added: ReadonlySet<string>
  removed: ReadonlySet<string>
}

const freshEdits = (base: readonly string[]): Edits => ({ base, added: new Set(), removed: new Set() })

/**
 * Tracks which nodes are visible on top of `baseNodeIds`, and which nodes the user has expanded.
 *
 * - Clicking a collapsed node reveals its direct children.
 * - Clicking an expanded node hides all of its descendants.
 * - A leaf node toggles its own visibility (it has no children to reveal).
 */
export default function useGraphVisibility(baseNodeIds: readonly string[], childrenIndex: Map<string, string[]>) {
  const [edits, setEdits] = useState<Edits>(() => freshEdits(baseNodeIds))
  const [clickedNodeIds, setClickedNodeIds] = useState<readonly string[]>([])

  const activeEdits = edits.base === baseNodeIds ? edits : null

  const visibleNodeIds = useMemo(() => {
    const ids = new Set(baseNodeIds)
    if (activeEdits) {
      activeEdits.added.forEach((id) => ids.add(id))
      activeEdits.removed.forEach((id) => ids.delete(id))
    }
    return ids
  }, [baseNodeIds, activeEdits])

  const clickedNodeIdSet = useMemo(() => new Set(clickedNodeIds), [clickedNodeIds])

  const applyEdit = useCallback(
    (show: string[], hide: string[]) => {
      setEdits((prev) => {
        const current = prev.base === baseNodeIds ? prev : freshEdits(baseNodeIds)
        const added = new Set(current.added)
        const removed = new Set(current.removed)
        for (const id of show) {
          added.add(id)
          removed.delete(id)
        }
        for (const id of hide) {
          removed.add(id)
          added.delete(id)
        }
        return { base: baseNodeIds, added, removed }
      })
    },
    [baseNodeIds],
  )

  const toggleNode = useCallback(
    (nodeId: string) => {
      if (clickedNodeIdSet.has(nodeId)) {
        const descendants = getDescendantIds(childrenIndex, nodeId)
        const toHide = descendants.length > 0 ? descendants : [nodeId]
        const hidden = new Set(toHide)
        applyEdit([], toHide)
        setClickedNodeIds((prev) => prev.filter((id) => id !== nodeId && !hidden.has(id)))
      } else {
        const children = childrenIndex.get(nodeId) ?? []
        applyEdit(children.length > 0 ? children : [nodeId], [])
        setClickedNodeIds((prev) => (prev.includes(nodeId) ? prev : [...prev, nodeId]))
      }
    },
    [clickedNodeIdSet, childrenIndex, applyEdit],
  )

  return { visibleNodeIds, clickedNodeIds, clickedNodeIdSet, toggleNode }
}
