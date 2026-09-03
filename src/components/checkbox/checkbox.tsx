import { memo } from 'react'

interface CheckboxProps {
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

function CheckboxComponent({ label, checked, onCheckedChange }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className="te-checkbox focus-visible:ring-ring focus:outline-none focus-visible:ring-1"
    >
      <span className="te-checkbox-indicator" data-state={checked ? 'checked' : 'unchecked'}>
        {checked ? '[-]' : '[x]'}
      </span>
      <span className="te-checkbox-label">{label}</span>
    </button>
  )
}

const Checkbox = memo(CheckboxComponent)

export default Checkbox
