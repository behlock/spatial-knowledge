import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as SelectPrimitive from '@radix-ui/react-select'
import { clsx } from 'clsx'
import Button from './button'

type SelectProps = {
  options: string[]
  selectedTags: string[]
  onValueChange: (value: string) => void
}

const Select = (props: SelectProps) => {
  return (
    <SelectPrimitive.Root value={""} onValueChange={props.onValueChange}>
      <SelectPrimitive.Trigger asChild aria-label="Food">
        <Button>
          {props.selectedTags.join(' — ')}
          <SelectPrimitive.Icon className="ml-2">
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </Button>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content>
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700 ">
          <ChevronUpIcon />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="bg-white my-10 px-14 py-6 rounded-lg shadow-lg">
          <SelectPrimitive.Group>
            {props.options.map((f, i) => (
              <SelectPrimitive.Item
                disabled={f === 'Grapes'}
                key={`${f}-${i}`}
                value={f}
                className={clsx(
                  'relative flex items-center px-8 py-2 rounded-md text-sm text-gray-700  font-medium focus:bg-gray-100 ',
                  'radix-disabled:opacity-50',
                  'focus:outline-none select-none'
                )}
              >
                <SelectPrimitive.ItemText>{f}</SelectPrimitive.ItemText>
                <div className="absolute left-2 inline-flex items-center">
                  {props.selectedTags.includes(f) ? <CheckIcon /> : null}
                </div>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700 ">
          <ChevronDownIcon />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  )
}

export default Select
