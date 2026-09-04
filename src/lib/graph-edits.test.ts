import { describe, expect, it } from 'vitest'

import { buildChildrenIndex } from '@/lib/graph'
import { editsFor, emptyEdits, toggleNode, visibleNodeIds } from '@/lib/graph-edits'

const index = buildChildrenIndex([
  { source: 'root', target: 'a' },
  { source: 'root', target: 'b' },
  { source: 'a', target: 'a1' },
])
const base = ['root']

describe('toggleNode', () => {
  it('reveals direct children and records the click', () => {
    const edits = toggleNode(emptyEdits(base), index, 'root')
    expect([...visibleNodeIds(edits)].sort()).toEqual(['a', 'b', 'root'])
    expect(edits.clicked).toEqual(['root'])
  })

  it('hides all descendants on the second click and collapses them', () => {
    let edits = toggleNode(emptyEdits(base), index, 'root')
    edits = toggleNode(edits, index, 'a')
    expect(visibleNodeIds(edits).has('a1')).toBe(true)
    expect(edits.clicked).toEqual(['root', 'a'])

    edits = toggleNode(edits, index, 'root')
    expect([...visibleNodeIds(edits)]).toEqual(['root'])
    expect(edits.clicked).toEqual([])
  })

  it('toggles a leaf node on itself', () => {
    let edits = toggleNode(emptyEdits(['a1']), index, 'a1')
    expect(visibleNodeIds(edits).has('a1')).toBe(true)
    edits = toggleNode(edits, index, 'a1')
    expect(visibleNodeIds(edits).has('a1')).toBe(false)
    expect(edits.clicked).toEqual([])
  })

  it('does not mutate the previous edits', () => {
    const before = emptyEdits(base)
    toggleNode(before, index, 'root')
    expect(before.added.size).toBe(0)
    expect(before.clicked).toEqual([])
  })
})

describe('editsFor', () => {
  it('discards edits made against a different base, including clicks', () => {
    const edits = toggleNode(emptyEdits(base), index, 'root')
    expect(editsFor(edits, base)).toBe(edits)

    const reset = editsFor(edits, ['root', 'a'])
    expect(reset.added.size).toBe(0)
    expect(reset.clicked).toEqual([])
  })
})
