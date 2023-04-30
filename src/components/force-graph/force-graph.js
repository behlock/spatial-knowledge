import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import SpriteText from 'three-spritetext'
import { CSS2DRenderer } from 'three-stdlib'

import Checkbox from '@/components/checkbox'
import useDeviceDetect from '@/hooks/useDeviceDetect'

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
})

//MAIN
export const ForceGraph = ({ englishData, arabicData }) => {
  // LANGUAGE
  // const [language, setLanguage] = useState('english')
  // const graphData = language === 'english' ? englishData : arabicData

  // const [graphData, setGraphData] = useState(englishData)

  const { isMobile } = useDeviceDetect()

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

  const getAllDescendantIds = (nodeId) => {
    const childrenIds = getNodeChildrenIds(nodeId);
    let descendants = [];
  
    childrenIds.forEach((childId) => {
      descendants.push(childId);
      const childDescendants = getAllDescendantIds(childId);
      descendants = descendants.concat(childDescendants);
    });
  
    return descendants;
  };

  // NODES
  // Set initially shown nodes
  const hardcodedDefaultVisibleNodesIds = 
    [
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

  const hardcodedDefaultVisibleNodes = graphData.nodes.filter((n) => hardcodedDefaultVisibleNodesIds.includes(n.id))

  const [visibleNodesIds, setVisibleNodesIds] = useState(hardcodedDefaultVisibleNodesIds)
  const [completeSetOfNodes, setCompleteSetOfNodes] = useState(hardcodedDefaultVisibleNodes)
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
    setVisibleNodesIds(visibleNodesIds.filter((id) => !grandchildrenIds.includes(id) ))
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
  const [selectedTags, setSelectedTags] = useState(isMobile ? ["During session"] : [])
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
      setCompleteSetOfNodes(hardcodedDefaultVisibleNodes)
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
      { !isMobile &&
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
          label={'Reveal'}
          checked={isRevealed}
          onCheckedChange={() => {
            setIsRevealed(!isRevealed)
          }}
        />
      </div>}
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
              return 'rgba(228, 255, 0, 1)'
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

const duringSessionNodesIds = [
  "Phase",
  "During session",
  "During street intervention",
  "Setup intervention area",
  "Make it clear and practical",
  "Use specificities of location",
  "Communicate prompt to people",
  "Connect with the situation created",
  "Cultivate open mindset",
  "Prompt open to interpretation",
  "Explain purpose/meaning",
  " Open space  for diversity",
  "Embrace interpretations of participants",
  "Tend to the creative process",
  "Be attentive to phases of \n evolution of the piece",
  "Take part of the action",
  "Help piece come together",
  "Do not overpower \n participants' action",
  "Which put work out of balance",
  "Highly significant actions",
  "Which bring it \n all together",
  "Which get reproduced \n by others",
  "Moments which mark a transformation",
  "Listen to changes in \n passersby's remarks",
  "Keep up with evolution \n of the piece",
  "During workshops with groups",
  "Set the ground",
  "Take care of logistics",
  "Communicate game boundaries",
  "Guide warm-up",
  "Cultivate facilitator mindset",
  "Facilitate the session",
  "Facilitate reflection",
  "Can put tools at their \n disposal",
  "Explain purpose of session",
  "Ask questions related \n to past session",
  "Commonly agree on \n ethics and habits",
  "Guide session flow",
  "Hold the space",
  "Speak from the heart",
  "Perceiving sessions as an evolutionary \n creative process",
  "Centered, playful and aware",
  "Flexible and embracing \n of uncertainty",
  "Egalitarian",
  "Prepare pre-requisite for the game",
  "Prepare mindset",
  "Warm-up the body",
  "Show example (if needed)",
  "Lusory attitude=playing out \n of their own free will",
  "Essentials of the game area",
  "Get session filmed for \n future reflection",
  "Various small tasks",
  "Prepare music playlist",
  "Game description",
  "Number of creations",
  "Singular",
  "Multiple",
  "All the focus is on \n one creation",
  "Interdependent creations evolving simultaneously",
  "Gameplay",
  "Environment/Setup",
  "Open dialogue",
  "Look at and analyze result",
  "How is it read?",
  "Is color or form \n taking priority?",
  "As a mood/energy",
  "Provide platform for \n their notes",
  "Give perspective to experience \n from place of learning",
  "Participants, playing as",
  "I ran from all my heart \n forgot about everything \n I was completely absorbed",
  "Role playing",
  "Playing as self",
  "Identifying self as character \n within the bounds of play",
  "Games  absorb  players \n into second reality",
  "Type of game",
  "Theme",
  "Determine game language",
  "How is it played?",
  "Rules of the game",
  "How rigid are the rules?",
  "Playing with and \n testing boundaries",
  "Paradoxically needs limits",
  "Need to be clearly understandable",
  "Drawings can help",
  "Rigid/tight",
  "Open/loose",
  "Who decided them?",
  "Agreed upon by all \n participants",
  "Enforced by one person",
  "Impossible without trust",
  "Creates a very enjoyable \n effective, experience",
  "Can feel oppressive if faced \n with undealt with resistance",
  "Is an exercise in collective \n decision making",
  "Goal needs to be very clear",
  "Potentials of strictness",
  "Gets things organized",
  "Time efficient",
  "Makes comparing experiences \n possible",
  "Setbacks of strictness",
  "Can limit exploration \n and innovation",
  "Can constrain sense of \n initiative",
  "More chaos allowed",
  "Has requirements to \n be constructive",
  "Shared sense of safety",
  "From the facilitator",
  "Presence and high flexibility",
  "Shared broad direction",
  "Distinguish between constructive and \n destructive behavior",
  "From the players",
  "The logic of the game \n as a clear limit",
  "Strong interaction \n between them",
  "Leads to emergence of \n clusters of action",
  "First signs of formation \n of a microsociety",
  "Consciously aware of each other",
  "Creative potentials of chaos",
  "Energetic and exhilarating",
  "Accidental chance occurences",
  "Grasping the opportunity \n leads to transformation",
  "Emergence of new order",
  "In par with natural evoution",
  "Essential for self-guided \n learning",
  "Openness triggers self-initative",
  "Results in complex behavior",
  "Triggers out of the box thinking",
  "Destructive risks of chaos",
  "High intensity",
  "All boundaries and direction \n  can become unclear",
  "Can be tough to take back the \n guidance of the session",
  "Tends to become draining",
  "Creative process can get \n entangled with group dynamics",
  "Actions",
  "What's the goal?",
  "Time signature",
  "Materials used",
  "Game setting",
  "Who's responsible for \n the game design?",
  "Facilitator",
  "Participants during session",
  "Adjust plan according \n to emerging situation",
  "Alternate exercises, games \n and reflections",
  "Allocate adequate materials \n to each phase",
  "Keep up momentum of session",
  "We all gather for the reflection",
  "Add on, don't cancel",
  "There are appropriate times for \n propositions and others for action",
  "Keep chaos constructive",
  "Facilitate meaningful dialogue",
  "Strengthen human connection",
  "Stay attuned to the \n  creative process",
  "Create space for their initiatives",
  "Participate when needed",
  "Never enforce ideas",
  "Technique of tools",
  "Personal, individual creation",
  "Is location indoors \n or outdoors?",
  "Is it a familiar or \n new space?",
  "How can materials \n be layed out?",
  "Who sets up the \n  game space?",
  "How are we using \n  the environment?",
  "Our game is highly contextual",
  "Same game could be \n played anywhere",
  "Facilitator before players arrive",
  "Players as an integral part \n of the experience",
  "Physical stance of the players",
  "Sitting",
  "Standing",
  "At ground level",
  "In movement",
  "Types of layouts",
  "Centralized focus",
  "Immersive and spatial",
  "Separate clusters \n of action",
  "Spread out surfaces \n for action",
  "In linear formations",
  "In radial formations",
  "Effects of centralizing",
  "Focused attention",
  "Energy transmits easily",
  "Effects of decentralizing",
  "Triggers exploration",
  "Activates physical movement \n in space",
  "Engaging social experience",
  "Discover natural affinities",
  "Dynamic highly sensitive to \n each participant's input",
  "Shy participants might retreat",
  "Proactive participants might \n take all",
  "Attention can drift off topic",
  "Could be challenging to \n re-gather the energy",
  "What's the scale?",
  "Players take action ON \n the game",
  "Players take action WITHIN \n the game",
  "How's the layout?",
  "Accessibility of tools",
  "Location of action",
  "Lighting",
  "Is light an integral \n part of the experience?",
  "What does it consist of?",
  "Open game",
  "Closed game",
  "Engages competition",
  "Instinctively create a lot of \n excitement",
  "Engages cooperation",
  "Combination",
  "Alternates both types",
  "Reaching goal is the \n end of the game",
  "Reaching goal keeps \n the game going",
  "Competition needs collaboration \n in adhering to the rules",
  "Affects the mood of \n the session",
  "Are we using chance?",
  "Individually",
  "Self explorations joining in \n a collective creation",
  "Collective exploration creates \n collective creation",
  "Collectively",
  "In small groups",
  "Task could need organization",
  "Facilitator can provide \n initial guidance",
  "Facilitator can  observe their \n approach w/out guidance",
  "Open it up for reflection",
  "Collective decision making",
  "Close cooperation",
  "Situation with high \n learning potential",
  "Is very sensitive \n to group dynamics",
  "Is smoother when \n individuals are",
  "Easy-going, open, mindful \n of others",
  "Able to have dialogue",
  "Each playing their part",
  "Creates equal ground",
  "Creates a link with deep \n outlooks on life",
  "Relieves people from \n need of control",
  "Two-Dimensional",
  "What constrains the creation?",
  "Rules give form to the \n infinity of possibilities",
  "Skills of any level can \n participate",
  "Its evolution in time",
  "One continuous evolution \n tending towards entropy",
  "Time divided to different phases",
  "Players' interaction",
  "Through layering of actions",
  "Is indirect communication",
  "Action and reception are \n separate in time",
  "Aspect of resulting image",
  "Texture of time",
  "Traces of actions",
  "Dynamic entanglement of \n evocative forms",
  "Three-Dimensional",
  "What's it made of?",
  "Affected by material constraints",
  "Gravity/balance",
  "Bendability/solidity",
  "What's needed to join \n two pieces together?",
  "Material characteristics",
  "Dimensions/weight",
  "Builders interact through",
  "Strong potential of reaching \n collective flow",
  "Assemblage",
  "Material manipulation",
  "Direct collaboration",
  "Resulting object or installation",
  "Is comprehended as",
  "Whole figure",
  "Immersive space",
  "Can easily become element \n of another game",
  "Physical movement",
  "Bodies as elements of \n the game",
  "Rules as behavioral constraints",
  "Which reinforce feedback loop",
  "High physical interaction",
  "Close contact and sensorial \n activation",
  "Create systematic motion",
  "Visual result",
  "Choreographic visual result",
  "Extraordinary collective \n behavior",
  "Combination of languages",
  "Living systems",
  "Can be inspired from",
  "Personal experience",
  "Open questions",
  "Dialectical subjects",
  "Human psychology",
  "Found material",
  "Questions arising from \n real life situations",
  "Established practices",
  "Art or craft making processes",
  "Board games/video games \n sports",
  "Circus and performative arts",
  "Environmental, social \n economic or political ",
  "Creates a story",
  "Makes the game more relatable",
  "Finding its essential parts \n is very helpful for the game",
  "Types of rules",
  "Are required for",
  "Their clarity and success \n affects future steps",
  "Fixed rules",
  "Variable rules",
  "Creating a positive tension \n and a feedback loop",
  "Blending players' actions",
  "Limiting the actions possible",
  "Setting limits to \n verbal communication",
  "Are personal expressions",
  "Are physical traces",
  "Trigger more then one \n physical movement",
  "Emerge from the self",
  "Give creative outlet \n for impulses",
  "Create a common language",
  "Simple, incrementally \n reach complexity",
  "Are a personal mark",
  "Can be sourced from",
  "We can make something from anything",
  "What can be done with \n what we have?",
  "Transform the space",
  "Have history",
  "Material available on location",
  "Ready-mades",
  "Objects, magazines, images",
  "Their transformation creates \n unexpected meanings",
  "Quantity of raw material",
  "Advantages of re-using",
  "Giving value back w/out \n manufacturing anew",
  "Types of material found",
  "Simple manipulations feel \n like breakthroughs",
  "Less pressure and expectations",
  "Natural material",
  "Rich with details",
  "Can have very \n evocative forms",
  "Have a strong aesthetic",
  "Leaves no trash",
  " Reconnect with \n natural world",
  "Store bought",
  "Stationary",
  "Some participants can feel \n pressured by expectations",
  "Opportunity to change \n preconceived ideas",
  "Opportunity to learn in \n open environment",
  "Opportunity to try",
  "Hardware",
  "Inspires curiosity \n no pressure",
  "Some core tools are \n re-used in many sessions",
  "Trace making",
  "Fluid materials",
  "Dry materials",
  "What is seen is the direct \n impact of the action",
  "Colors",
  "An entry into different \n types of crafts",
  "Can be used to harmonize",
  "Action they will be \n used for",
  "Moldable types",
  "Can be used to play with shadow",
  "Non precious",
  "Morphs beyond the direct \n impact of the action",
  "Can really stimulate imagination",
  "Building",
  "Material types",
  "Solid materials",
  "Flexible types",
  "Required characteristics",
  "Easy to use and process",
  "Offer potentials of play",
  "Players build connection \n through  materials",
  "Sharing tasks",
  "Worksite atmosphere \n creates flow",
  "Affect the energy released ",
  "High and loud",
  "Smooth and calm",
  "Require tools for processing",
  "A direction which results \n in a collective creation",
  "Gives incentive to keep \n the game going",
  "A build up on the theme",
  "Duration and division of time",
  "Note: All sessions happen within \n  divided entropy ",
  "Entropy",
  "Short defined time",
  "Types of time divisions",
  "Alternates playing/reflection",
  "Allows for comparative \n iteration",
  "Requires stricter rule keeping \n for efficiency",
  "Limit the amount of rules \n added each time",
  "Can keep up momentum",
  "Opens space for discussion",
  "Risks too much verbal \n communication",
  "Inclusive",
  "Loses momentum",
  "Is a natural progression",
  "We can observe different \n phases of evolution",
  "Players can enter state \n of flow",
  "Can have rising or losing \n momentum",
  "Radical transformation can happen \n during gameplay",
  "Ongoing expansion in expanding time",
  "Timing of players' actions",
  "Simultaneous direct interaction",
  "Successive indirect interaction",
  "Allows for all participants to \n observe progression",
  "Slower rhythm then simultaneity",
  "If too slow it kills momentum",
  "Opens space for strategic \n and rational thinking",
  "Creates an energizing atmosphere",
  "Worksite atmosphere",
  "Triggers collective drive",
  "Spontaneous interactions",
  "Going with the flow",
  "Exchange of skills by \n observation",
  "Makes it easier to reiterate",
  "Stimulates the senses",
  "Can be overwhelming",
  "Shakes participants out of \n comfort zone",
  "For some its transformational",
  "For some its frustrating",
  "From the game",
  "From the group dynamics",
  "Linking observations to theories",
  "Opening a safe space \n for diverging opinions",
  "Finding different ways of getting \n ideas understood",
  "Self-perceived limits \n are respected",
  "It's a non judgemental space \n to learn about each other",
  "Of the players",
  "Of the piece/experience",
  "Collectively attuned",
  "Listening & looking at \n each other",
  "Making collective decisions",
  "Individually attuned",
  "Confident",
  "Willful",
  "Playful",
  "Spontaneous and intuitive",
  "Into the theme and world \n of the game",
  "Gather energy",
  "Collect our minds",
  "Starting together sets \n the pace for the session",
  "Sensorially attuned",
  "Heightened energy to  enter \n the creative flow",
  "Connected to the breath",
  "How does it trigger imagination?",
  "How can we develop \n this process?",
  "How does it contribute to \n our understanding?",
  "About the boundaries \n of the experience",
  "About warm-up",
  "About individual experiences",
  "About special situations",
  "Potentially a main inspiration \n for next session",
  "About collective work",
  "Changes which happened to \n their perceptions",
  "Extract  ideas \n for next session",
  "From participants' requests",
  "About the theme, techniques \n and materials",
  "About reinterpreting \n a known game",
  "Facilitator can reinterpret \n the requests",
  "From small details \n during discussions",
  "From synthesis of reflection",
  "Proposes a game developed \n pre-session",
  "Players experience and reflect \n on the game",
  "All rules are open for change",
  "Have the initiative and \n decide boundaries",
  " Make collective decisions",
  "Creating the game is \n the creative process",
  "Facilitation required",
  "Time keeping",
  "Keeping it inclusive",
  "Encouraging iteration and trial",
  "Set target on gameplay not roleplay",
  "Define the logic of the game",
  "Affect the gameplay but \n not the logic",
  "The game element exists \n within there",
  "If they are effective in \n stimulating the players",
  "Trials experiment with \n the variable rules",
  "To explore different flows \n of interaction",
  "To reach more complexity \n in the result/experience",
  "Theme is there but \n gameplay is not engaging",
  "Trials aim to find the game \n within these boundaries",
  "If its unbounded",
  "If its clearly dedicated to \n reflection & planning phases",
  "Gives possibility to find \n shared vision",
  "Risks an atmosphere of \n judgement and criticism",
  "Shy players might not speak up",
  "Creative process might \n become too rational",
  "Favors intuitive communication \n during gameplay",
  "Facilitates acceptance and flow",
  "Rules can counter potential \n setbacks of verbal communication",
  "The challenges of communication \n offer much to play with",
  "Without aesthetic judgement",
  "Propose ideas when possible",
  "Help with use of tools",
  "Put complementaries together",
  "Help bypass their blockages",
  "Push to explore their potential",
  "The interactions created by \n the game",
  "The dynamics emerging",
  "Are actions merging \n creating complexity?",
  "The actions of each participant",
  "If they're doing something else \n what is it?",
  "Identify key moments",
  "When did meaning emerge?",
  "When did group \n get into a flow?",
  "What events affected \n the whole progression?",
  "An idea transmitting \n to all players",
  "Interactions changing the dynamic",
  "Curious and experimental",
  "Most creative state \n of being",
  "Inclusive of differences",
  "Get acquainted with \n the symbolism",
  "Getting a hint of \n the challenge",
  "Non-hesitant automatism",
  "Making free-associations",
  "Bypassing the rational",
  "Sharing allows us to feel \n our perception matters",
  "Sharing allows us to recognize \n similarities with others",
  "Positives and negatives",
  "How did they work together \n through their challenges?",
  "How does each feel about \n collective work",
  "If a tense situation occurs",
  "Allow it to happen talk \n about it in reflection",
  "Deal with it directly",
  "How to allow a smooth \n communication?",
  "Keeping in mind their own \n ability to self-regulate",
  "Did players feel well \n prepared?",
  "Was its length adequate?",
  "As as general outline",
  "What did or didn't work \n as expected?",
  "What makes it good?",
  "What makes it fail?",
  "About rules",
  "Were they clear and challenging?",
  "Did they create interaction \n and momentum?",
  "How else could we have \n tried to play it?",
  "About the actions",
  "What mood are they \n adequate for?",
  "Were they intriguing and meaningful?",
  "Did they provide enough \n choice and diversity?",
  "How did participants relate \n to the material?",
  "Did its manipulation feel \n instinctive?",
  "Did we have adequate tools?",
  "Did it trigger something particular?",
  "Was the purpose clear?",
  "Was the formulation adequate?",
  "Did it create the drive?",
  "Does it help their visions to \n find common ground?",
  "Concepts we played with",
  "Tangible inspirations",
  "Intangible inspirations",
  "With obvious physical \n aspects to them",
  "First group OP",
  "Second grouping OP",
  "With wide interpretations \n for physical application",
  "First grouping WI",
  "Second grouping WI",
  "Third grouping WI",
  "Simulating our living systems",
  "Reproduction of a personal graphic element",
  "Use of shadow to morph shapes",
  "Re-adaptation of board and video games ",
  "Bounding the trace to contours of objects ",
  "Creation of imagery from \n collective story telling",
  "Balance as a link \n between players' action",
  "Analyzing known games to get inspired",
  "Connecting through the material \n building, construction",
  "'House' with Zayraqoun'",
  "Building our own musical instruments",
  "Starting the game with the setup",
  "Games from real life \n challenges",
  "Rules which create choreographies",
  "Free will and determinism",
  "Dancing to an emerging image",
  "Who's oppressing who?",
  "Creating laboratory contexts",
  "Entangled collective unconscious",
  "Bonding through dreams",
  "The game area as coexistence ",
  "Collective understanding through \n critical reflection",
  "What insights have we \n reached through editing the video?",
  "Insights from reflections \n and videos",
  "Insights from reflections \n and videos",
  "First grouping insights",
  "Second grouping insights",
  "Third grouping insights",
  "Building as the first \n collective creative acts in history",
  "Patterns emerge from chaos \n in small sequences",
  "Without awareness the meaning \n gets lost",
  "Self-knowledge is the first bridge \n towards others",
  "Playgrounds as spaces we need \n to learn to be ourselves with others",
  "Every situation has a game to it",
  "Better rules can make \n better play",
  "The experience isn't defined by the goal",
  "Balance as a path of exploration",
  "Culture as simultaneity of \n creative experiences",
  "Cheating is play, up until \n cheating ruins the game",
  "Collective knowledge as the coming \n together individual knowledges",
  "One individual cannot \n understand everyone",
  "Reflection is the heart of the experience",
  "Building games \n builds meaningful relationships",
  "Syncing through physical entanglement",
  "Observations about cheating",
  "Reveals areas where rules \n can be added",
  "Cannot challenge logic \n of the game"
]
