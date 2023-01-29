import dynamic from 'next/dynamic'

import SpriteText from 'three-spritetext'

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
})

export const ForceGraph = ({ graphData, hiddenNodes, setHiddenNodes }) => (
  <ForceGraph3D
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
      const sprite = new SpriteText(node.id)
      sprite.color = node.color
      sprite.textHeight = 8
      return sprite
    }}
    nodeAutoColorBy="group"
    onNodeClick={(node) => {
      if (hiddenNodes.includes(node.id)) {
        setHiddenNodes(hiddenNodes.filter((id) => id !== node.id))
      } else {
        setHiddenNodes([...hiddenNodes, node.id])
      }
    }}
    nodeVisibility={(node) => {
      return !hiddenNodes.includes(node.id)
    }}
    // LINKS
    // linkWidth={2}
    linkColor="black"
    linkDirectionalArrowLength={3.5}
    linkDirectionalArrowRelPos={1}
    linkCurvature={0.25}
  />
)
