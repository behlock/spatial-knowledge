import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import SpriteText from 'three-spritetext'
import { CSS2DRenderer } from 'three-stdlib'

import Checkbox from '@/components/checkbox'
import { arabicDuringSessionNodesIds, arabicHardcodedDefaultVisibleNodesIds } from '@/data/arabic-hardcoded-nodes'
import { englishDuringSessionNodesIds, englishHardcodedDefaultVisibleNodesIds } from '@/data/english-hardcoded-nodes'
import useDeviceDetect from '@/hooks/useDeviceDetect'
import { Language } from '@/modules/language'

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
})

//MAIN
export const ForceGraph = ({ graphData, language }) => {
  const { isMobile } = useDeviceDetect()

  const [hardcodedDefaultVisibleNodesIds, setHardcodedDefaultVisibleNodesIds] = useState([])
  const [hardcodedDefaultVisibleNodes, setHardcodedDefaultVisibleNodes] = useState([])
  const [clickedNodes, setClickedNodes] = useState([])
  const [duringSessionNodesIds, setDuringSessionNodesIds] = useState([])
  const [duringSessionNodes, setDuringSessionNodes] = useState([])
  const [visibleNodesIds, setVisibleNodesIds] = useState([])
  const [completeSetOfNodes, setCompleteSetOfNodes] = useState([])

  // RENDERING
  const [extraRenderers, setExtraRenderers] = useState([])
  useEffect(() => {
    setExtraRenderers([new CSS2DRenderer()])
  }, [])

  let isEnglish = language === Language.English

  useEffect(() => {
    setHardcodedDefaultVisibleNodesIds(
      isEnglish ? englishHardcodedDefaultVisibleNodesIds : arabicHardcodedDefaultVisibleNodesIds
    )

    setPhases(isEnglish ? englishPhases : arabicPhases)
    setSelectedTags([])

    setDuringSessionNodesIds(isEnglish ? englishDuringSessionNodesIds : arabicDuringSessionNodesIds)
  }, [isEnglish])

  useEffect(() => {
    setHardcodedDefaultVisibleNodes(graphData.nodes.filter((n) => hardcodedDefaultVisibleNodesIds.includes(n.id)))
    setVisibleNodesIds(hardcodedDefaultVisibleNodesIds)
  }, [hardcodedDefaultVisibleNodesIds])

  useEffect(() => {
    setCompleteSetOfNodes(hardcodedDefaultVisibleNodes)
  }, [hardcodedDefaultVisibleNodes])

  useEffect(() => {
    setDuringSessionNodes(graphData.nodes.filter((n) => duringSessionNodesIds.includes(n.id)))
    setVisibleNodesIds(isMobile ? duringSessionNodesIds : hardcodedDefaultVisibleNodesIds)
  }, [duringSessionNodesIds])

  useEffect(() => {
    setCompleteSetOfNodes(isMobile ? duringSessionNodes : hardcodedDefaultVisibleNodes)
  }, [duringSessionNodes])

  useEffect(() => {
    setVisibleNodesIds(isMobile ? duringSessionNodesIds : hardcodedDefaultVisibleNodesIds)
    setCompleteSetOfNodes(isMobile ? duringSessionNodes : hardcodedDefaultVisibleNodes)
  }, [isMobile])

  // CHILDREN
  const getNodeChildren = (nodeId) =>
    graphData.links.filter((l) => {
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

  // ANCESTORS
  const nodeAncestors = (node) => {
    const parents = graphData.links.filter((l) => l.target.id === node.id)
    if (parents.length === 0) {
      return []
    }

    return parents.map((p) => p.source).concat(parents.flatMap((p) => nodeAncestors(p.source, graphData.links)))
  }

  Array.prototype.max = function () {
    return Math.max.apply(null, this)
  }

  // TAGS
  const englishPhases = ['Pre-session', 'During session', 'Post-session']
  const arabicPhases = ['ما قبل الجلسة', 'خلال الجلسة', 'ما بعد الجلسة']

  const [phases, setPhases] = useState([])

  const selectTag = (tag, selectedTags, setSelectedTags) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  // CLICK
  useEffect(() => {
    if (clickedNodes.length > 0) {
      let firstClickedNodeId = clickedNodes[0]
      let firstClickedNode = graphData.nodes.find((n) => n.id === firstClickedNodeId)
      firstClickedNode.color = 'rgba(228, 255, 0, 1)'
    }
  }, [clickedNodes])

  const dimNodeAndChildren = (node, links) => {
    let grandchildrenIds = getAllDescendantIds(node.id)
    if (grandchildrenIds.length == 0) {
      grandchildrenIds = [node.id]
    }
    setVisibleNodesIds(visibleNodesIds.filter((id) => !grandchildrenIds.includes(id)))
    setClickedNodes(clickedNodes.filter((id) => !grandchildrenIds.includes(id) && id !== node.id))
  }

  const undimNodeAndChildren = (node, links) => {
    let childrenIds = getNodeChildrenIds(node.id, links)
    if (childrenIds.length == 0) {
      childrenIds = [node.id]
    }

    setVisibleNodesIds(visibleNodesIds.concat(childrenIds))
    setClickedNodes(clickedNodes.concat(node.id))
  }

  const handleNodeClick = (node) => {
    // Click on any other node
    if (!clickedNodes.includes(node.id)) {
      undimNodeAndChildren(node, graphData.links)
    }

    // Collapse node
    else {
      dimNodeAndChildren(node, graphData.links)
    }
  }

  // PANEL
  const [selectedTags, setSelectedTags] = useState([])
  const [isRevealed, setIsRevealed] = useState(false)

  const isVisible = (node) => {
    if (node.tags) {
      return node.tags.some((tag) => selectedTags.includes(tag))
    }
    return false
  }

  useEffect(() => {
    if (isRevealed) {
      setCompleteSetOfNodes(graphData.nodes)
    } else {
      setCompleteSetOfNodes(isMobile ? duringSessionNodes : hardcodedDefaultVisibleNodes)
    }
  }, [isRevealed])

  useEffect(() => {
    if (selectedTags.length !== 0) {
      let visibleNodes = completeSetOfNodes.filter((node) => isVisible(node))
      setVisibleNodesIds(visibleNodes.map((node) => node.id))
    } else {
      setVisibleNodesIds(completeSetOfNodes.map((node) => node.id))
    }
  }, [selectedTags, completeSetOfNodes])

  // VIEW
  return (
    <>
      {!isMobile && (
        <div className="z-50 mt-2 mb-2 mr-2 flex h-full w-fit flex-row">
          {phases.map((phase) => {
            return (
              <div className="mr-3 flex flex-row" key={phase}>
                <Checkbox
                  label={phase}
                  checked={selectedTags.includes(phase)}
                  onCheckedChange={() => selectTag(phase, selectedTags, setSelectedTags)}
                />
              </div>
            )
          })}
          <Checkbox
            label={isEnglish ? 'Reveal' : 'كشف'}
            checked={isRevealed}
            onCheckedChange={() => {
              setIsRevealed(!isRevealed)
            }}
          />
        </div>
      )}
      <div className="fixed left-0 top-0 z-10 flex h-full w-full flex-col align-middle">
        <ForceGraph3D
          // RENDERING
          extraRenderers={extraRenderers}
          // DATA
          graphData={graphData}
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
            sprite.color = visibleNodesIds.includes(node.id) ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0)'
            sprite.fontSize = 25
            return sprite
          }}
          nodeThreeObjectExtend={true}
          nodeAutoColorBy={(node) => node.color}
          nodeVisibility={(node) => visibleNodesIds.includes(node.id)}
          nodeOpacity={0.5}
          nodeResolution={32}
          // ACTIONS
          onNodeClick={isMobile ? () => {} : handleNodeClick}
          // LINKS
          linkWidth={(link) => {
            if (clickedNodes.includes(link.source.id)) {
              return 2
            } else {
              return 1
            }
          }}
          linkColor={(link) => {
            if (clickedNodes.includes(link.source.id) && visibleNodesIds.includes(link.target.id)) {
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
