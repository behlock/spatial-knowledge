import { useCallback, useMemo, useState } from 'react'

import { editsFor, emptyEdits, toggleNode as applyToggle, visibleNodeIds as computeVisible } from '@/lib/graph-edits'

/** Tracks which nodes are visible on top of `baseNodeIds` and which the user has expanded. */
export default function useGraphVisibility(baseNodeIds: readonly string[], childrenIndex: Map<string, string[]>) {
  const [edits, setEdits] = useState(() => emptyEdits(baseNodeIds))
  const active = useMemo(() => editsFor(edits, baseNodeIds), [edits, baseNodeIds])

  const visibleNodeIds = useMemo(() => computeVisible(active), [active])
  const clickedNodeIds = useMemo(() => new Set(active.clicked), [active])
  const highlightedNodeId = active.clicked[0]

  const toggleNode = useCallback(
    (nodeId: string) => setEdits((prev) => applyToggle(editsFor(prev, baseNodeIds), childrenIndex, nodeId)),
    [baseNodeIds, childrenIndex],
  )

  return { visibleNodeIds, clickedNodeIds, highlightedNodeId, toggleNode }
}
