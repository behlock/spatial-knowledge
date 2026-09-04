import { describe, expect, it } from 'vitest'

import { defaultVisibleNodeIds, mobileVisibleNodeIds, phases } from '@/data/graph-setup'
import graph from '@/data/nodes.json'

const nodeIds = graph.nodes.map((node) => node.id)
const nodeIdSet = new Set(nodeIds)
const duplicates = (values: readonly string[]) => values.filter((value, i) => values.indexOf(value) !== i)
const padded = (values: readonly string[]) => values.filter((value) => value !== value.trim())

describe('graph data', () => {
  it('has unique, trimmed node ids', () => {
    expect(duplicates(nodeIds)).toEqual([])
    expect(padded(nodeIds)).toEqual([])
  })

  it('has trimmed tags', () => {
    expect(padded(graph.nodes.flatMap((node) => node.tags))).toEqual([])
  })

  it('links only known nodes, without duplicates or self-links', () => {
    const unknown = graph.links.filter((link) => !nodeIdSet.has(link.source) || !nodeIdSet.has(link.target))
    expect(unknown).toEqual([])
    expect(duplicates(graph.links.map((link) => `${link.source} -> ${link.target}`))).toEqual([])
    expect(graph.links.filter((link) => link.source === link.target)).toEqual([])
  })
})

describe('curated node lists', () => {
  it.each([
    ['defaultVisibleNodeIds', defaultVisibleNodeIds],
    ['mobileVisibleNodeIds', mobileVisibleNodeIds],
  ])('%s only lists existing nodes, once each', (_, ids) => {
    expect(ids.filter((id) => !nodeIdSet.has(id))).toEqual([])
    expect(duplicates(ids)).toEqual([])
  })
})

describe('phases', () => {
  it('filter on tags that exist in the data', () => {
    const tags = new Set(graph.nodes.flatMap((node) => node.tags))
    for (const phase of phases) expect(tags.has(phase.official), phase.official).toBe(true)
  })
})
