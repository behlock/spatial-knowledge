import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import SpriteText from 'three-spritetext'
import { CSS2DRenderer } from 'three-stdlib'

import Checkbox from '@/components/checkbox'

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
})

//MAIN
export const ForceGraph = (props) => {
  const [extraRenderers, setExtraRenderers] = useState([])

  // RENDERING
  useEffect(() => {
    setExtraRenderers([new CSS2DRenderer()])
  }, [])

  // CHILDREN
  const getNodeChildren = (nodeId) =>
    props.graphData.links.filter((l) => {
      return l.source.id === nodeId
    })

  const getNodeChildrenIds = (nodeId) => {
    let children = getNodeChildren(nodeId)
    return children.map((l) => l.target.id)
  }

  const getAllDescendantIds = (nodeId) => {
    const childrenIds = getNodeChildrenIds(nodeId)
    let descendants = []

    childrenIds.forEach((childId) => {
      descendants.push(childId)
      const childDescendants = getAllDescendantIds(childId)
      descendants = descendants.concat(childDescendants)
    })

    return descendants
  }

  // TAGS
  const selectTag = (tag, selectedTags, setSelectedTags) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const isVisible = (node) => {
    if (node.tags) {
      return node.tags.some((tag) => props.selectedTags.includes(tag))
    }
    return false
  }

  useEffect(() => {
    if (props.selectedTags.length !== 0) {
      let visibleNodes = props.completeSetOfNodes.filter((node) => isVisible(node))
      props.setVisibleNodesIds(visibleNodes.map((node) => node.id))
    } else {
      props.setVisibleNodesIds(props.completeSetOfNodes.map((node) => node.id))
    }
  }, [props.selectedTags, props.completeSetOfNodes])

  // CLICK
  useEffect(() => {
    if (props.clickedNodes.length > 0) {
      let firstClickedNodeId = props.clickedNodes[0]
      let firstClickedNode = props.graphData.nodes.find((n) => n.id === firstClickedNodeId)
      firstClickedNode.color = 'rgba(228, 255, 0, 1)'
    }
  }, [props.clickedNodes])

  const dimNodeAndChildren = (node, links) => {
    let grandchildrenIds = getAllDescendantIds(node.id)
    if (grandchildrenIds.length == 0) {
      grandchildrenIds = [node.id]
    }
    props.setVisibleNodesIds(props.visibleNodesIds.filter((id) => !grandchildrenIds.includes(id)))
    props.setClickedNodes(props.clickedNodes.filter((id) => !grandchildrenIds.includes(id) && id !== node.id))
  }

  const undimNodeAndChildren = (node, links) => {
    let childrenIds = getNodeChildrenIds(node.id, links)
    if (childrenIds.length == 0) {
      childrenIds = [node.id]
    }

    props.setVisibleNodesIds(props.visibleNodesIds.concat(childrenIds))
    props.setClickedNodes(props.clickedNodes.concat(node.id))
  }

  const handleNodeClick = (node) => {
    if (!props.clickedNodes.includes(node.id)) {
      undimNodeAndChildren(node, props.graphData.links)
    } else {
      dimNodeAndChildren(node, props.graphData.links)
    }
  }

  // VIEW
  return (
    <>
      {!props.isMobile && (
        <div className="z-50 mb-2 mr-2 mt-2 flex h-full w-fit flex-row">
          {props.phases.map((phase) => {
            return (
              <div className="mr-3 flex flex-row" key={phase}>
                <Checkbox
                  label={phase.label}
                  checked={props.selectedTags.includes(phase.official)}
                  onCheckedChange={() => selectTag(phase.official, props.selectedTags, props.setSelectedTags)}
                />
              </div>
            )
          })}
          <Checkbox
            label={props.revealCheckboxLabel}
            checked={props.isRevealed}
            onCheckedChange={() => {
              props.setIsRevealed(!props.isRevealed)
            }}
          />
        </div>
      )}
      <div className="fixed left-0 top-0 z-10 flex h-full w-full flex-col align-middle">
        <ForceGraph3D
          // RENDERING
          extraRenderers={extraRenderers}
          d3AlphaDecay={0.01}
          // DATA
          graphData={props.graphData}
          nodeId="id"
          linkSource="source"
          linkTarget="target"
          // CONTAINER
          backgroundColor="rgb(23 23 23)"
          showNavInfo={false}
          // NODES
          nodeRelSize={10}
          nodeVal={(node) => {
            node.group
          }}
          nodeLabel={() => ''}
          nodeThreeObject={(node) => {
            const label = node.id
            const sprite = new SpriteText(label)
            sprite.textHeight = 6
            sprite.color = props.visibleNodesIds.includes(node.id)
              ? 'rgba(255, 255, 255, 0.9)'
              : 'rgba(255, 255, 255, 0)'
            sprite.fontSize = 25
            return sprite
          }}
          nodeThreeObjectExtend={true}
          nodeAutoColorBy={(node) => node.color}
          nodeVisibility={(node) => props.visibleNodesIds.includes(node.id)}
          nodeOpacity={0.5}
          nodeResolution={32}
          // ACTIONS
          onNodeClick={props.isMobile ? () => {} : handleNodeClick}
          // LINKS
          linkWidth={(link) => {
            if (props.clickedNodes.includes(link.source.id)) {
              return 2
            } else {
              return 1
            }
          }}
          linkColor={(link) => {
            if (props.clickedNodes.includes(link.source.id) && props.visibleNodesIds.includes(link.target.id)) {
              return 'white'
            } else {
              return 'rgba(255, 255, 255, 0.3)'
            }
          }}
          linkOpacity={0.5}
        />
      </div>
    </>
  )
}
