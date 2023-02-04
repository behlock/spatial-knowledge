import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { CSS2DObject, CSS2DRenderer } from 'three-stdlib'

import s from './force-graph.module.scss'

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
})

const getNodeChildren = (node, links) =>
  links
    .filter((l) => {
      return l.source.id === node.id
    })
    .map((l) => l.target.id)

export const ForceGraph = ({ graphData, visibleNodes, setVisibleNodes, expandedNodes, setExpandedNodes }) => {
  const [extraRenderers, setExtraRenderers] = useState([])
  useEffect(() => {
    setExtraRenderers([new CSS2DRenderer()])
  }, [])

  return (
    <ForceGraph3D
      // RENDERING
      extraRenderers={extraRenderers}
      // DATA
      graphData={graphData}
      // CONTAINER
      backgroundColor="black"
      // NODES
      nodeRelSize={8}
      nodeVal={(node) => {
        node.group
      }}
      nodeLabel={() => ''}
      nodeThreeObject={(node) => {
        const nodeEl = document.createElement('div')
        nodeEl.textContent = node.id
        nodeEl.style.color = node.color
        nodeEl.className = s.nodeLabel
        return new CSS2DObject(nodeEl)
      }}
      nodeAutoColorBy="group"
      nodeThreeObjectExtend={true}
      // onNodeClick={(node) => {
      //   if (expandedNodes.includes(node.id)) {
      //     const children = getNodeChildren(node, graphData.links)
      //     setExpandedNodes(expandedNodes.filter((id) => id !== node.id))
      //     setVisibleNodes(visibleNodes.filter((id) => !children.includes(id)))
      //   } else {
      //     setExpandedNodes([...expandedNodes, node.id])
      //     setVisibleNodes(visibleNodes.concat(getNodeChildren(node, graphData.links)))
      //   }
      // }}
      // nodeVisibility={(node) => {
      //   return visibleNodes.includes(node.id)
      // }}
    />
  )
}
