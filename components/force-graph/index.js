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

//MAIN
export const ForceGraph = ({ graphData }) => {
  // STATE
  const [extraRenderers, setExtraRenderers] = useState([])
  useEffect(() => {
    setExtraRenderers([new CSS2DRenderer()])
  }, [])

  const [layers, setLayers] = useState([])
  useEffect(() => {
    // TODO
    setLayers([5])
  }, [])

  // VISIBILITY
  const isVisible = (node, links) => graphDepth(node, links) <= layers[0]
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
        <Popover layers={layers} setLayers={setLayers} maxDepth={maxDepth(graphData)} />
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
          nodeEl.className = s.nodeLabel
          return new CSS2DObject(nodeEl)
        }}
        nodeAutoColorBy={(node) => node.color}
        nodeThreeObjectExtend={true}
        nodeVisibility={(node) => visibleNodes(graphData).includes(node.id)}
      />
    </>
  )
}
