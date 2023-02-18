import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { CSS2DObject, CSS2DRenderer } from 'three-stdlib'

import { Popover } from 'components/popover'
import s from './force-graph.module.scss'

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
  const [layers, setLayers] = useState([4])
  const [selectedTags, setSelectedTags] = useState([])

  // HOOKS
  useEffect(() => {
    setExtraRenderers([new CSS2DRenderer()])
  }, [])

  // VISIBILITY
  const isVisible = (node, links) =>
    nodeAncestors(node, links).length <= layers[0] && selectedTags.every((t) => node.tags.includes(t))

  const visibleNodes = (graphData) =>
    graphData.nodes.filter((node) => isVisible(node, graphData.links)).map((node) => node.id)

  const isTooLightYIQ = (hexcolor) => {
    let r = parseInt(hexcolor.substr(0, 2), 16)
    let g = parseInt(hexcolor.substr(2, 2), 16)
    let b = parseInt(hexcolor.substr(4, 2), 16)
    let yiq = (r * 299 + g * 587 + b * 114) / 1000
    return yiq >= 128
  }

  return (
    <>
      <div className={s.popover}>
        <Popover
          layers={layers}
          setLayers={setLayers}
          // TODO
          maxDepth={4}
          allTags={getTags(graphData)}
          selectedTags={selectedTags}
          updateTag={(tag, _) => selectTag(tag, selectedTags, setSelectedTags)}
        />
      </div>
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
          const nodeEl = document.createElement('div')
          nodeEl.textContent = node.id
          nodeEl.style.color = isTooLightYIQ(node.color) ? '#000' : '#fff'
          nodeEl.style.fontSize = '0.75rem'
          nodeEl.style.userSelect = 'none'
          nodeEl.style.textAlign = 'center'
          nodeEl.style.width = '100px'
          nodeEl.className = s.nodeLabel
          return new CSS2DObject(nodeEl)
        }}
        nodeThreeObjectExtend={true}
        nodeAutoColorBy={(node) => node.color}
        nodeVisibility={(node) => visibleNodes(graphData).includes(node.id)}
        nodeOpacity={1}
        nodeResolution={32}
        // onNodeClick={(node) => {
        //   // Aim at node from outside it
        //   const distance = 40
        //   const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z)

        //   const newPos =
        //     node.x || node.y || node.z
        //       ? { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }
        //       : { x: 0, y: 0, z: distance } // special case if node is in (0,0,0)

        //   this.cameraPosition(
        //     newPos, // new position
        //     node, // lookAt ({ x, y, z })
        //     3000 // ms transition duration
        //   )
        // }}
      />
    </>
  )
}
