import React from 'react'
import { clsx } from 'clsx'

interface CheckboxProps {
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

const Checkbox = React.memo((props: CheckboxProps) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={props.checked}
      onClick={() => props.onCheckedChange(!props.checked)}
      className={clsx(
        'te-checkbox',
        'inline-flex items-center gap-1',
        'focus:outline-none focus-visible:ring-1 focus-visible:ring-ring'
      )}
    >
      <span
        className="te-checkbox-indicator"
        data-state={props.checked ? 'checked' : 'unchecked'}
      >
        {props.checked ? '[-]' : '[x]'}
      </span>
      <span className="te-checkbox-label">{props.label}</span>
    </button>
  )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox
