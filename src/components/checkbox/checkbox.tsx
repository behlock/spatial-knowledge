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
          'flex h-4 w-4 mt-1 items-center justify-center rounded',
          'radix-state-checked:bg-gray-200  radix-state-unchecked:bg-gray-200',
          'focus:outline-none '
        )}
      >
        <CheckboxPrimitive.Indicator>
          <CheckIcon className="h-5 w-5 self-center text-black" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      <LabelPrimitive.Label
        htmlFor="c1"
        className="ml-2 select-none text-s text-gray-300"
        onClick={() => props.onCheckedChange(!props.checked)}
      >
        {props.label}
      </LabelPrimitive.Label>
    </>
  )
}

export default Checkbox
