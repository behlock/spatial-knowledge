import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import SpriteText from 'three-spritetext'
import { CSS2DRenderer } from 'three-stdlib'

import { Popover } from 'components/popover'

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
})

// CHILDREN
const getNodeChildren = (node, links) =>
  links.filter((l) => {
    return l.source.id === node.id
  })

const getNodeChildrenIds = (node, links) => getNodeChildren(node, links).map((l) => l.target.id)

// DEPTH
const graphDepth = (node, links) => {
  const children = getNodeChildren(node, links)
  if (children.length === 0) {
    return 1
  }
  return 1 + Math.max(...children.map((c) => graphDepth(c.target, links)))
}
const maxDepth = (graphData) =>
  graphData.nodes.map((node) => graphDepth(node, graphData.links)).reduce((a, b) => Math.max(a, b), -Infinity)

// ANCESTORS
const nodeAncestors = (node, links) => {
  const parents = links.filter((l) => l.target.id === node.id)
  if (parents.length === 0) {
    return []
  }

  return parents.map((p) => p.source).concat(parents.flatMap((p) => nodeAncestors(p.source, links)))
}

const maxAncestors = (graphData) =>
  graphData.nodes
    .map((node) => {
      let ancestors = nodeAncestors(node, graphData.links)
      return ancestors.length + 1
    })
    .reduce((a, b) => Math.max(a, b), -Infinity)

// TAGS
const getTags = (graphData) => {
  let tags = []
  graphData.nodes.forEach((node) => {
    if (node.tags) {
      tags = tags.concat(node.tags)
    }
  })
  return [...new Set(tags)]
}

const selectTag = (tag, selectedTags, setSelectedTags) => {
  if (selectedTags.includes(tag)) {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  } else {
    setSelectedTags([...selectedTags, tag])
  }
}

//MAIN
export const ForceGraph = ({ graphData }) => {
  // STATE
  const [extraRenderers, setExtraRenderers] = useState([])
  const [layers, setLayers] = useState([13])
  const [selectedTags, setSelectedTags] = useState([])

  // HOOKS
  useEffect(() => {
    setExtraRenderers([new CSS2DRenderer()])
  }, [])

  // VISIBILITY
  const isVisible = (node, links) =>
    nodeAncestors(node, links).length <= layers[0] && selectedTags.every((t) => node.tags.includes(t))

  const [visibleNodes, setVisibleNodes] = useState(
    graphData.nodes.filter((node) => isVisible(node, graphData.links)).map((node) => node.id)
  )

  useEffect(() => {
    setVisibleNodes(graphData.nodes.filter((node) => isVisible(node, graphData.links)).map((node) => node.id))
  }, [selectedTags, layers])

  const [dimmedNodes, setDimmedNodes] = useState([])
  // CLICK
  const handleNodeClick = (node) => {
    getNodeChildrenIds(node, graphData.links).forEach((id) => {
      setDimmedNodes(
        graphData.nodes
          .map((n) => n.id)
          .filter((id) => !getNodeChildrenIds(node, graphData.links).includes(id) && id !== node.id)
      )
    })
  }

  return (
    <>
      <Popover
        layers={layers}
        setLayers={setLayers}
        // TODO
        maxDepth={13}
        allTags={getTags(graphData)}
        selectedTags={selectedTags}
        updateTag={(tag, _) => selectTag(tag, selectedTags, setSelectedTags)}
        // resetFilters={() => {
        //   setSelectedTags([])
        //   setLayers([7])
        //   setVisibleNodes(graphData.nodes.map((node) => node.id))
        // }}
      />
      <ForceGraph3D
        // RENDERING
        extraRenderers={extraRenderers}
        // DATA
        graphData={graphData}
        nodeId="id"
        linkSource="source"
        linkTarget="target"
        // CONTAINER
        backgroundColor="black"
        showNavInfo={false}
        // NODES
        nodeRelSize={10}
        nodeVal={(node) => {
          node.group
        }}
        nodeLabel={() => ''}
        nodeThreeObject={(node) => {
          const sprite = new SpriteText(node.id)
          sprite.textHeight = 6
          sprite.color = dimmedNodes.includes(node.id) ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)'
          sprite.fontSize = 25
          return sprite
        }}
        nodeThreeObjectExtend={true}
        nodeAutoColorBy={(node) => node.color}
        nodeVisibility={(node) => visibleNodes.includes(node.id)}
        nodeOpacity={0.3}
        nodeResolution={32}
        // ACTIONS
        onNodeClick={handleNodeClick}
      />
    </>
  )
}
