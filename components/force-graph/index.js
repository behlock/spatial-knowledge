import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { CSS2DObject, CSS2DRenderer } from 'three-stdlib'

import { Popover } from 'components/popover'
import s from './force-graph.module.scss'

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
})

const getNodeChildren = (node, links) =>
  links.filter((l) => {
    return l.source.id === node.id
  })

const getNodeChildrenIds = (node, links) => getNodeChildren(node, links).map((l) => l.target.id)

const graphDepth = (node, links) => {
  const children = getNodeChildren(node, links)
  if (children.length === 0) {
    return 1
  }
  return 1 + Math.max(...children.map((c) => graphDepth(c.target, links)))
}

const maxDepth = (graphData) =>
  graphData.nodes.map((node) => graphDepth(node, graphData.links)).reduce((a, b) => Math.max(a, b), -Infinity)
// graphData.nodes.map((node) => graphDepth(node, graphData.links))

export const ForceGraph = ({ graphData }) => {
  const [extraRenderers, setExtraRenderers] = useState([])
  useEffect(() => {
    setExtraRenderers([new CSS2DRenderer()])
  }, [])

  const [layers, setLayers] = useState([5])

  const visibleNodes = graphData.nodes
    .filter((node) => {
      return graphDepth(node, graphData.links) <= layers[0]
    })
    .map((node) => node.id)

  const nodeOpacity = (node) => {
    if (visibleNodes.includes(node.id)) {
      return 1
    } else {
      return 0.5
    }
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
        nodeRelSize={6}
        nodeVal={(node) => {
          node.group
        }}
        nodeLabel={() => ''}
        nodeThreeObject={(node) => {
          const nodeEl = document.createElement('div')
          nodeEl.textContent = node.id
          // nodeEl.style.color = node.color
          nodeEl.style.opacity = nodeOpacity(node)
          nodeEl.className = s.nodeLabel
          return new CSS2DObject(nodeEl)
        }}
        nodeAutoColorBy={(node) => node.tags[0]}
        nodeThreeObjectExtend={true}
      />
    </>
  )
}
