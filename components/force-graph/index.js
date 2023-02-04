import dynamic from 'next/dynamic'

import SpriteText from 'three-spritetext'

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
})

const getNodeChildren = (node, links) =>
  links
    .filter((l) => {
      return l.source.id === node.id
    })
    .map((l) => l.target.id)

export const ForceGraph = ({ graphData, visibleNodes, setVisibleNodes, expandedNodes, setExpandedNodes }) => (
  <ForceGraph3D
    // DATA
    graphData={graphData}
    // CONTAINER
    backgroundColor="black"
    // NODES
    nodeRelSize={4}
    nodeVal={(node) => {
      node.group
    }}
    nodeLabel={() => ''}
    nodeThreeObject={(node) => {
      const sprite = new SpriteText(node.id)
      sprite.color = node.color
      sprite.textHeight = 8
      return sprite
    }}
    nodeAutoColorBy="group"
    onNodeClick={(node) => {
      if (expandedNodes.includes(node.id)) {
        const children = getNodeChildren(node, graphData.links)
        setExpandedNodes(expandedNodes.filter((id) => id !== node.id))
        setVisibleNodes(visibleNodes.filter((id) => !children.includes(id)))
      } else {
        setExpandedNodes([...expandedNodes, node.id])
        setVisibleNodes(visibleNodes.concat(getNodeChildren(node, graphData.links)))
      }
    }}
    // nodeVisibility={(node) => {
    //   return visibleNodes.includes(node.id)
    // }}
  />
)
