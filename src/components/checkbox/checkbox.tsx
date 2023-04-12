import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import * as LabelPrimitive from '@radix-ui/react-label'
import { clsx } from 'clsx'

interface CheckboxProps {
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

const Checkbox = (props: CheckboxProps) => {
  return (
    <>
      <CheckboxPrimitive.Root
        id={`c-${props.label}`}
        checked={props.checked}
        onCheckedChange={props.onCheckedChange}
        className={clsx(
          'flex h-3 w-3 items-center justify-center rounded',
          'radix-state-checked:bg-orange-600 radix-state-unchecked:bg-gray-100 dark:radix-state-unchecked:bg-gray-800',
          'focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75'
        )}
      >
        <CheckboxPrimitive.Indicator>
          <CheckIcon className="h-4 w-4 self-center text-white" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      <LabelPrimitive.Label
        htmlFor="c1"
        className="ml-1 select-none text-xs font-small text-gray-300"
        onClick={() => props.onCheckedChange(!props.checked)}
      >
        {props.label}
      </LabelPrimitive.Label>
    </>
  )
}

export default Checkbox
