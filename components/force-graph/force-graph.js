import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import SpriteText from 'three-spritetext'
import { CSS2DRenderer } from 'three-stdlib'

import Select from 'components/select'
import Slider from 'components/slider'

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
  const [layers, setLayers] = useState([20])
  const [selectedTags, setSelectedTags] = useState([])
  const [isVideo, setIsVideo] = useState(false)

  // HOOKS
  useEffect(() => {
    setExtraRenderers([new CSS2DRenderer()])
  }, [])

  // VISIBILITY
  const isVisible = (node, links) =>
    nodeAncestors(node, links).length <= layers[0] &&
    selectedTags.every((t) => node.tags.includes(t)) &&
    node.isVideo === isVideo

  const [visibleNodes, setVisibleNodes] = useState(
    graphData.nodes.filter((node) => isVisible(node, graphData.links)).map((node) => node.id)
  )

  useEffect(() => {
    setVisibleNodes(graphData.nodes.filter((node) => isVisible(node, graphData.links)).map((node) => node.id))
  }, [selectedTags, layers])

  // CLICK
  const [dimmedNodes, setDimmedNodes] = useState([])
  const [clickedNodes, setClickedNodes] = useState([])
  const handleNodeClick = (node) => {
    let childrenIds = getNodeChildrenIds(node, graphData.links)

    if (dimmedNodes.length == 0 || !clickedNodes.includes(node.id)) {
      if (childrenIds.length == 0) {
        childrenIds = [node.id]
      }
      childrenIds.forEach((id) => {
        setDimmedNodes(graphData.nodes.map((n) => n.id).filter((id) => !childrenIds.includes(id) && id !== node.id))
      })
    } else {
      setDimmedNodes([])
      setClickedNodes([])
    }
    setClickedNodes([node.id])
  }

  return (
    <>
      {/* <Popover
        layers={layers}
        setLayers={setLayers}
        maxDepth={20}
        allTags={getTags(graphData)}
        selectedTags={selectedTags}
        updateTag={(tag, _) => selectTag(tag, selectedTags, setSelectedTags)}
        isVideo={isVideo}
        setIsVideo={setIsVideo}
        // resetFilters={() => {
        //   setSelectedTags([])
        //   setLayers([7])
        //   setVisibleNodes(graphData.nodes.map((node) => node.id))
        // }}
      /> */}

      <form className="flex flex-col relative h-full max-w-sm mt-4 space-y-4 z-20">
        <fieldset key={`popover-items-layers`} className="flex flex-col align-middle space-y-2">
          <label htmlFor={'layers'} className="mr-4 shrink-0 grow text-s font-medium text-gray-700 dark:text-gray-400">
            {'How much complexity to you want to see?'}
          </label>
          <Slider value={layers} min={0} max={20} step={1} onValueChange={setLayers} />
        </fieldset>
        <fieldset key={`popover-items-select`} className="flex flex-col h-full align-middle space-y-2">
          <label htmlFor={'tags'} className="mr-4 shrink-0 grow text-s font-medium text-gray-700 dark:text-gray-400">
            {'Which themes are you interested in?'}
          </label>
          <Select
            options={getTags(graphData)}
            selectedTags={selectedTags}
            onValueChange={(tag) => selectTag(tag, selectedTags, setSelectedTags)}
          />
        </fieldset>

        {/* {props.allTags.map((tag) => (
              <fieldset key={`popover-items-checkbox-${tag}`} className="flex align-middle ">
                <Checkbox
                  label={tag}
                  checked={props.selectedTags.includes(tag)}
                  onCheckedChange={(checked) => props.updateTag(tag, checked)}
                />
              </fieldset>
            ))} */}
      </form>
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
            const sprite = new SpriteText(node.id)
            sprite.textHeight = 6
            sprite.color = dimmedNodes.includes(node.id) ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)'
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
        />
      </div>
    </>
  )
}
