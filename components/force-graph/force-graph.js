import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import SpriteText from 'three-spritetext'
import { CSS2DRenderer } from 'three-stdlib'

import Button from 'components/button'
import Select from 'components/select'
import Slider from 'components/slider'
import Switch from 'components/switch'
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

Array.prototype.max = function () {
  return Math.max.apply(null, this)
}

const maxAncestors = (graphData) => graphData.nodes.map((node) => nodeAncestors(node, graphData.links).length + 1).max()

// TAGS
const getTags = (graphData) => {
  let tags = []
  graphData.nodes.forEach((node) => {
    if (node.tags) {
      tags = tags.concat(node.tags)
    }
  })
  tags.sort()
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
  const [layers, setLayers] = useState([22])
  const [selectedTags, setSelectedTags] = useState([])
  const [isVideo, setIsVideo] = useState(false)
  const [isParametersPanelOpen, setIsParametersPanelOpen] = useState(false)

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

  useEffect(() => {
    if (isVideo) {
      setVisibleNodes(
        graphData.nodes
          .filter((node) => node.isVideo || nodeAncestors(node, graphData.links).some((n) => n.isVideo))
          .map((node) => node.id)
      )
    } else {
      setVisibleNodes(graphData.nodes.filter((node) => isVisible(node, graphData.links)).map((node) => node.id))
    }
  }, [isVideo])

  // CLICK
  const [dimmedNodes, setDimmedNodes] = useState([])
  const [clickedNodes, setClickedNodes] = useState([])

  const resetGraphVisiblity = () => {
    setDimmedNodes([])
    setClickedNodes([])
  }

  const dimNodeAndChildren = (node, links) => {
    let childrenIds = getNodeChildrenIds(node, links)
    setDimmedNodes(dimmedNodes.concat(graphData.nodes.map((n) => n.id).filter((id) => childrenIds.includes(id))))
    setClickedNodes(clickedNodes.filter((id) => !childrenIds.includes(id) && id !== node.id))
  }

  const undimNodeAndChildren = (node, links) => {
    let childrenIds = getNodeChildrenIds(node, links)
    setDimmedNodes(dimmedNodes.filter((id) => !childrenIds.includes(id) && id !== node.id))
    setClickedNodes(clickedNodes.concat(node.id))
  }

  const handleNodeClick = (node) => {
    if (node.isVideo) {
      window && window.open(node.id, '_blank')
    }

    // First clicked node is clicked again
    if (node.id == clickedNodes[0]) {
      resetGraphVisiblity()
    }

    // No dimmed nodes yet
    else if (dimmedNodes.length == 0) {
      let childrenIds = getNodeChildrenIds(node, graphData.links)
      setDimmedNodes(graphData.nodes.map((n) => n.id).filter((id) => !childrenIds.includes(id) && id !== node.id))
      setClickedNodes(clickedNodes.concat(node.id))
    }

    // Click on any other node
    else if (!clickedNodes.includes(node.id)) {
      undimNodeAndChildren(node, graphData.links)
    }

    // Collapse node
    else {
      dimNodeAndChildren(node, graphData.links)
    }
  }

  return (
    <>
      <Button onClick={() => setIsParametersPanelOpen(!isParametersPanelOpen)}>
        <div className="flex flex-row flex-wrap items-center">
          <span className="mr-2 w-xs">Parameters</span>
          {isParametersPanelOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </div>
      </Button>
      {isParametersPanelOpen && (
        <form className="flex flex-col relative h-full max-w-xs mt-4 mr-8 space-y-4 z-20">
          <fieldset key={`popover-items-isVideo`} className="flex space-x-2 justify-center align-middle">
            <Switch checked={isVideo} onChange={setIsVideo} />
            <label htmlFor={'isVideo'} className="shrink-0 grow text-s font-medium text-gray-700 dark:text-gray-400">
              {'Videos'}
            </label>
          </fieldset>
          <fieldset key={`popover-items-layers`} className="flex flex-col align-middle space-y-2">
            <label
              htmlFor={'layers'}
              className="mr-4 shrink-0 grow text-s font-medium text-gray-700 dark:text-gray-400"
            >
              {'Depth'}
            </label>
            <Slider value={layers} min={0} max={22} step={1} onValueChange={setLayers} />
          </fieldset>
          <fieldset key={`popover-items-select`} className="flex flex-col h-full align-middle space-y-2">
            <label htmlFor={'tags'} className="mr-4 shrink-0 grow text-s font-medium text-gray-700 dark:text-gray-400">
              {'Themes'}
            </label>
            <Select
              options={getTags(graphData)}
              selectedTags={selectedTags}
              onValueChange={(tag) => selectTag(tag, selectedTags, setSelectedTags)}
            />
          </fieldset>
        </form>
      )}
      <div className="flex flex-col h-full align-middle fixed w-full left-0 top-0 z-10">
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
            const label = node.isVideo ? "Video" : node.id
            const sprite = new SpriteText(label)
            sprite.textHeight = 6
            sprite.color = dimmedNodes.includes(node.id) ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.9)'
            sprite.fontSize = 25
            return sprite
          }}
          nodeThreeObjectExtend={true}
          nodeAutoColorBy={(node) => node.color}
          nodeVisibility={(node) => visibleNodes.includes(node.id)}
          nodeOpacity={0.5}
          nodeResolution={32}
          // ACTIONS
          onNodeClick={handleNodeClick}
          // LINKS
          linkWidth={1.5}
        />
      </div>
    </>
  )
}
