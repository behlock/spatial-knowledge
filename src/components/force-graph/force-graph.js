import dynamic from 'next/dynamic'
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import SpriteText from 'three-spritetext'
import { CSS2DRenderer } from 'three-stdlib'

import Checkbox from '@/components/checkbox'

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
})

//MAIN
const ForceGraphComponent = (props) => {
  const [extraRenderers, setExtraRenderers] = useState([])

  // Cache for getAllDescendantIds to avoid redundant recursive calculations
  const descendantsCacheRef = useRef(new Map())

  // Convert arrays to Sets for O(1) lookup performance
  const visibleNodesSet = useMemo(
    () => new Set(props.visibleNodesIds),
    [props.visibleNodesIds]
  )
  const clickedNodesSet = useMemo(
    () => new Set(props.clickedNodes),
    [props.clickedNodes]
  )

  // Clear cache when graphData changes
  useEffect(() => {
    descendantsCacheRef.current.clear()
  }, [props.graphData])

  // RENDERING
  useEffect(() => {
    setExtraRenderers([new CSS2DRenderer()])
  }, [])

  // CHILDREN
  const getNodeChildren = useCallback(
    (nodeId) =>
      props.graphData.links.filter((l) => {
        return l.source.id === nodeId
      }),
    [props.graphData.links]
  )

  const getNodeChildrenIds = useCallback(
    (nodeId) => {
      let children = getNodeChildren(nodeId)
      return children.map((l) => l.target.id)
    },
    [getNodeChildren]
  )

  const getAllDescendantIds = useCallback(
    (nodeId) => {
      // Check cache first
      if (descendantsCacheRef.current.has(nodeId)) {
        return descendantsCacheRef.current.get(nodeId)
      }

      const childrenIds = getNodeChildrenIds(nodeId)
      let descendants = []

      childrenIds.forEach((childId) => {
        descendants.push(childId)
        const childDescendants = getAllDescendantIds(childId)
        descendants = descendants.concat(childDescendants)
      })

      // Store in cache
      descendantsCacheRef.current.set(nodeId, descendants)
      return descendants
    },
    [getNodeChildrenIds]
  )

  // TAGS
  const selectTag = useCallback((tag, selectedTags, setSelectedTags) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }, [])

  useEffect(() => {
    if (props.selectedTags.length !== 0) {
      // selectedTags now represents tags to HIDE
      let visibleNodes = props.completeSetOfNodes.filter((node) => {
        if (node.tags) {
          return !node.tags.some((tag) => props.selectedTags.includes(tag))
        }
        return true
      })
      props.setVisibleNodesIds(visibleNodes.map((node) => node.id))
    } else {
      props.setVisibleNodesIds(props.completeSetOfNodes.map((node) => node.id))
    }
  }, [props.selectedTags, props.completeSetOfNodes, props.setVisibleNodesIds])

  // CLICK
  useEffect(() => {
    if (props.clickedNodes.length > 0) {
      let firstClickedNodeId = props.clickedNodes[0]
      let firstClickedNode = props.graphData.nodes.find((n) => n.id === firstClickedNodeId)
      if (firstClickedNode) {
        firstClickedNode.color = 'rgba(228, 255, 0, 1)'
      }
    }
  }, [props.clickedNodes, props.graphData.nodes])

  const dimNodeAndChildren = useCallback(
    (node, links) => {
      let grandchildrenIds = getAllDescendantIds(node.id)
      if (grandchildrenIds.length == 0) {
        grandchildrenIds = [node.id]
      }
      const grandchildrenSet = new Set(grandchildrenIds)
      props.setVisibleNodesIds(props.visibleNodesIds.filter((id) => !grandchildrenSet.has(id)))
      props.setClickedNodes(
        props.clickedNodes.filter((id) => !grandchildrenSet.has(id) && id !== node.id)
      )
    },
    [getAllDescendantIds, props.visibleNodesIds, props.clickedNodes, props.setVisibleNodesIds, props.setClickedNodes]
  )

  const undimNodeAndChildren = useCallback(
    (node, links) => {
      let childrenIds = getNodeChildrenIds(node.id, links)
      if (childrenIds.length == 0) {
        childrenIds = [node.id]
      }

      props.setVisibleNodesIds(props.visibleNodesIds.concat(childrenIds))
      props.setClickedNodes(props.clickedNodes.concat(node.id))
    },
    [getNodeChildrenIds, props.visibleNodesIds, props.clickedNodes, props.setVisibleNodesIds, props.setClickedNodes]
  )

  const handleNodeClick = useCallback(
    (node) => {
      if (!clickedNodesSet.has(node.id)) {
        undimNodeAndChildren(node, props.graphData.links)
      } else {
        dimNodeAndChildren(node, props.graphData.links)
      }
    },
    [clickedNodesSet, undimNodeAndChildren, dimNodeAndChildren, props.graphData.links]
  )

  // Memoized ForceGraph3D callback props
  const nodeVal = useCallback((node) => {
    node.group
  }, [])

  const nodeThreeObject = useCallback(
    (node) => {
      const label = node.id
      const sprite = new SpriteText(label)
      sprite.textHeight = 6
      sprite.color = visibleNodesSet.has(node.id)
        ? 'rgba(255, 255, 255, 0.9)'
        : 'rgba(255, 255, 255, 0)'
      sprite.fontSize = 25
      return sprite
    },
    [visibleNodesSet]
  )

  const nodeVisibility = useCallback(
    (node) => visibleNodesSet.has(node.id),
    [visibleNodesSet]
  )

  const linkWidth = useCallback(
    (link) => {
      if (clickedNodesSet.has(link.source.id)) {
        return 3
      } else {
        return 1
      }
    },
    [clickedNodesSet]
  )

  const linkColor = useCallback(
    (link) => {
      if (clickedNodesSet.has(link.source.id) && visibleNodesSet.has(link.target.id)) {
        return 'white'
      } else {
        return 'rgba(255, 255, 255, 0.3)'
      }
    },
    [clickedNodesSet, visibleNodesSet]
  )

  const onNodeClick = useMemo(
    () => (props.isMobile ? () => {} : handleNodeClick),
    [props.isMobile, handleNodeClick]
  )

  // VIEW
  return (
    <>
      {!props.isMobile && (
        <div className="te-panel z-50 mb-2 mr-2 mt-2 flex h-fit w-fit flex-row items-center justify-center gap-4 px-3 py-2 align-middle">
          {props.phases.map((phase) => {
            return (
              <Checkbox
                label={phase.label}
                checked={props.selectedTags.includes(phase.official)}
                onCheckedChange={() => selectTag(phase.official, props.selectedTags, props.setSelectedTags)}
                key={phase.label}
              />
            )
          })}
          <div className="h-4 w-px bg-border" />
          <Checkbox
            label={props.revealCheckboxLabel}
            checked={!props.isRevealed}
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
          d3AlphaDecay={0.03}
          // DATA
          graphData={props.graphData}
          nodeId="id"
          linkSource="source"
          linkTarget="target"
          // CONTAINER
          backgroundColor="#171717"
          showNavInfo={false}
          // NODES
          nodeRelSize={10}
          nodeVal={nodeVal}
          nodeLabel={() => ''}
          nodeThreeObject={nodeThreeObject}
          nodeThreeObjectExtend={true}
          nodeAutoColorBy={(node) => node.color}
          nodeVisibility={nodeVisibility}
          nodeOpacity={0.5}
          nodeResolution={32}
          // ACTIONS
          onNodeClick={onNodeClick}
          // LINKS
          linkWidth={linkWidth}
          linkColor={linkColor}
          linkOpacity={0.5}
        />
      </div>
    </>
  )
}

export const ForceGraph = React.memo(ForceGraphComponent)
