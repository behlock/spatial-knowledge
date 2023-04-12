import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import SpriteText from 'three-spritetext'
import { CSS2DRenderer } from 'three-stdlib'

import Checkbox from '@/components/checkbox'

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
})

//MAIN
export const ForceGraph = ({ englishData, arabicData }) => {
  // LANGUAGE
  // const [language, setLanguage] = useState('english')
  // const graphData = language === 'english' ? englishData : arabicData

  // const [graphData, setGraphData] = useState(englishData)

  const graphData = englishData

  // CHILDREN
  const getNodeChildren = (nodeId) =>
    graphData.links.filter((l) => {
      return l.source.id === nodeId
    })

  const getNodeChildrenIds = (nodeId) => {
    let children = getNodeChildren(nodeId)
    return children.map((l) => l.target.id)
  }

  // NODES
  // Set initially shown nodes
  const hardcodedDefaultVisibleNodesIds = [
    'Look back at course of \n the session',
    'Who designed the game?',
    'Self-reflection on \n facilitator role',
    'Resort to external perspective',
    'How did the game \n boundaries perform?',
    'How was the group dynamic?',
    'Concepts we played with',
    'With obvious physical \n aspects to them',
    'With wide interpretations \n for physical application',
    'First grouping OP',
    'Second grouping OP',
    'First grouping WI',
    'Second grouping WI',
    'Insight from reflections \n and videos',
    'Phase',
    'During session',
    'During street intervention',
    'During workshops with groups',
    'Post-session reflection',
    'Reflecting on workshop',
    'Reflection on street intervention',
    'Pre-session planning',
    'Session is asked for by \n a client/partner/collaborator',
    'Planning a street intervention',
    'Upcoming session is part \n of a sequence of workshops \n or program',
    'Plan the session',
    'Insights from reflections \n and videos',
    'During session',
    'Pre-session planning',
    'Post-session reflection',
    'During street intervention',
    'During workshops with groups',
    'Work on setup',
    'Cultivate open mindset',
    'Tending the creative process',
    'Communicate prompt to passersby',
    'Set the ground',
    'Take care of logistics',
    'Communicate game boundaries',
    'Guide warm-up',
    'Cultivate facilitator mindset',
    'In facilitating the session',
    'Facilitate reflection',
    'Reflection on street intervention',
    'Reflecting on workshop',
    'Look back at course of \n the session',
    'Synthesize',
    'Take note of all mini-games \n ideas which emerge from \n this process',
    'Look at piece with a distance \n from its creation process',
    'Was setup intuitive and attractive?',
    'About the facilitation',
    'Evolution of experience',
    'Consequences of our presence \n on the street',
    'Upcoming session is part \n of a sequence of workshops \n or program',
    'Upcoming session is \n a one time event',
    'Session is self-initiated',
    'Session is asked for by \n a client/partner/collaborator',
    'Main field of interest',
    "Do an in-depth inquiry to understand \n partner's needs",
    'Look to understand all \n characteristics of the project',
    'Service sought for',
    'Determine context of intervention',
    'Interventions in public space \n using simple prompts to \n allow passersby to indirectly \n create together',
    'Plan the setup',
    'What material are we using?',
    "What's the game like?",
    'Program flow and strategy',
    'Look at synthesis from previous session',
    'Actively wander, be receptive',
    'Plan the session',
    'Decide on introductory \n questions and explanations',
    'Organize flow of the session',
    'Define the game boundaries',
    'Choose material',
    'Plan warm-up adequate \n for the game',
    'First grouping insights',
    'Second grouping insights',
    'Third grouping insights',
  ]

  const [visibleNodesIds, setVisibleNodesIds] = useState(hardcodedDefaultVisibleNodesIds)
  const [clickedNodes, setClickedNodes] = useState([])

  useEffect(() => {
    setVisibleNodesIds(hardcodedDefaultVisibleNodesIds)
  }, [])

  // RENDERING
  const [extraRenderers, setExtraRenderers] = useState([])
  useEffect(() => {
    setExtraRenderers([new CSS2DRenderer()])
  }, [])

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
  const phases = ['Pre-session', 'During session', 'Post-session']

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
    setIsRevealed(false)
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  // CLICK
  const dimNodeAndChildren = (node, links) => {
    let childrenIds = getNodeChildrenIds(node.id, links)
    if (childrenIds.length == 0) {
      childrenIds = [node.id]
      setVisibleNodesIds(visibleNodesIds.filter((id) => id !== node.id))
      setClickedNodes(clickedNodes.filter((id) => id !== node.id))
    } else {
      setVisibleNodesIds(visibleNodesIds.filter((id) => !childrenIds.includes(id)))
      setClickedNodes(clickedNodes.filter((id) => !childrenIds.includes(id)))
    }
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
    if (node.videoUrl) {
      window && window.open(node.videoUrl, '_blank')
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

  // PANEL
  const [selectedTags, setSelectedTags] = useState([])
  const [isRevealed, setIsRevealed] = useState(false)

  const expandAll = () => {
    setVisibleNodesIds(graphData.nodes.map((n) => n.id))
    setSelectedTags([])
  }

  const resetFilters = () => {
    setVisibleNodesIds(hardcodedDefaultVisibleNodesIds)
  }

  const isVisible = (node) => selectedTags.every((t) => node.tags.includes(t))

  useEffect(() => {
    if (isRevealed) {
      setVisibleNodesIds(graphData.nodes.map((n) => n.id))
    } else if (selectedTags.length !== 0) {
      let nodesFromVisibileNodesIds = graphData.nodes.filter((node) => visibleNodesIds.includes(node.id))
      let visibleNodes = nodesFromVisibileNodesIds.filter((node) => isVisible(node))
      setVisibleNodesIds(visibleNodes.map((node) => node.id))
    } else {
      setVisibleNodesIds(hardcodedDefaultVisibleNodesIds)
    }
  }, [selectedTags])

  // VIEW
  return (
    <>
      <div className="z-50 mt-2 mb-2 mr-2 flex h-full w-full flex-row">
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
          label={'Everything'}
          checked={isRevealed}
          onCheckedChange={() => {
            setIsRevealed(!isRevealed)
            if (isRevealed) {
              resetFilters()
            } else {
              expandAll()
            }
          }}
        />
      </div>
      {/* <Button
        onClick={(e) => {
          e.preventDefault()
          setIsRevealed(!isRevealed)
          if (isRevealed) {
            resetFilters()
          } else {
            expandAll()
          }
        }}
      >
        {isRevealed ? 'Reset' : 'Reveal'}
      </Button> */}

      {/* <Select
        phases={phases}
        // topics={getTags(graphData).filter((t) => !phases.includes(t))}
        selectedTags={selectedTags}
        onValueChange={(tag) => selectTag(tag, selectedTags, setSelectedTags)}
        open={isTagsPanelOpen}
        onOpenChange={setIsTagsPanelOpen}
        forceClose={forceClose}
        closeSelect={() => setForceClose(true)}
      /> */}
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
          backgroundColor="black"
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
          onNodeClick={handleNodeClick}
          // LINKS
          linkWidth={(link) => {
            if (clickedNodes.includes(link.source.id)) {
              return 3
            } else {
              return 1
            }
          }}
          linkColor={(link) => {
            if (clickedNodes.includes(link.source.id)) {
              return '#ffff00'
            } else {
              return '#ffffff'
            }
          }}
        />
      </div>
    </>
  )
}
