import { describe, expect, it } from 'vitest'

import { buildChildrenIndex, endpointId, getDescendantIds } from '@/lib/graph'

const links = [
  { source: 'root', target: 'a' },
  { source: 'root', target: 'b' },
  { source: 'a', target: 'a1' },
  { source: 'a1', target: 'a1x' },
  { source: 'b', target: 'a1' },
]

describe('endpointId', () => {
  it('accepts ids and node objects', () => {
    expect(endpointId('x')).toBe('x')
    expect(endpointId({ id: 'y' })).toBe('y')
  })
})

describe('buildChildrenIndex', () => {
  it('groups direct children by parent', () => {
    const index = buildChildrenIndex(links)
    expect(index.get('root')).toEqual(['a', 'b'])
    expect(index.get('a1')).toEqual(['a1x'])
    expect(index.get('a1x')).toBeUndefined()
  })
})

describe('getDescendantIds', () => {
  it('returns every descendant once', () => {
    const index = buildChildrenIndex(links)
    expect(getDescendantIds(index, 'root').sort()).toEqual(['a', 'a1', 'a1x', 'b'])
    expect(getDescendantIds(index, 'a1x')).toEqual([])
  })

  it('terminates on cycles and excludes the start node', () => {
    const index = buildChildrenIndex([
      { source: 'a', target: 'b' },
      { source: 'b', target: 'a' },
    ])
    expect(getDescendantIds(index, 'a')).toEqual(['b'])
  })
})
