import Checkbox from '@/components/checkbox'
import type { Phase } from '@/types/graph'

interface GraphControlsProps {
  phases: Phase[]
  /** Tags currently hidden from the graph. */
  hiddenTags: readonly string[]
  onToggleTag: (tag: string) => void
  isRevealed: boolean
  onToggleReveal: () => void
  revealLabel: string
}

export default function GraphControls({
  phases,
  hiddenTags,
  onToggleTag,
  isRevealed,
  onToggleReveal,
  revealLabel,
}: GraphControlsProps) {
  return (
    <div className="te-panel z-50 mt-2 mr-2 mb-2 flex h-fit w-fit flex-row items-center justify-center gap-4 px-3 py-2 align-middle">
      {phases.map((phase) => (
        <Checkbox
          key={phase.official}
          label={phase.label}
          checked={hiddenTags.includes(phase.official)}
          onCheckedChange={() => onToggleTag(phase.official)}
        />
      ))}
      <div className="bg-border h-4 w-px" />
      <Checkbox label={revealLabel} checked={!isRevealed} onCheckedChange={onToggleReveal} />
    </div>
  )
}
