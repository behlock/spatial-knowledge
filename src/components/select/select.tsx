import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as SelectPrimitive from '@radix-ui/react-select'
import { clsx } from 'clsx'
import Button from '../button/button'

type SelectProps = {
  phases: string[]
  // topics: string[]
  selectedTags: string[]
  onValueChange: (value: string) => void
  open: boolean
  onOpenChange: (open: boolean) => void
  forceClose: boolean
  closeSelect: () => void
}

const Select = (props: SelectProps) => {
  return (
    <SelectPrimitive.Root
      value={''}
      onValueChange={props.onValueChange}
      open={props.forceClose ? false : props.open}
      onOpenChange={(_) => props.onOpenChange(props.forceClose ? false : true)}
    >
      <SelectPrimitive.Trigger asChild aria-label="Food">
        <Button>
          {props.selectedTags.join(' — ')}
          <SelectPrimitive.Icon className="ml-2">
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </Button>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content
        onPointerDownOutside={(_) => props.closeSelect()}
        onEscapeKeyDown={(_) => props.closeSelect()}
      >
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700 ">
          <ChevronUpIcon />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="my-12 rounded-lg bg-white px-5 shadow-lg">
          <SelectPrimitive.Group>
            <SelectPrimitive.Label>Phases</SelectPrimitive.Label>
            {props.phases.map((f, i) => (
              <SelectPrimitive.Item
                key={`${f}-${i}`}
                value={f}
                className={clsx(
                  'relative flex items-center rounded-md px-8 py-2 text-sm font-medium  text-gray-700 focus:bg-gray-100 ',
                  'radix-disabled:opacity-50',
                  'select-none focus:outline-none'
                )}
              >
                <SelectPrimitive.ItemText>{f}</SelectPrimitive.ItemText>
                <div className="absolute left-2 inline-flex items-center">
                  {props.selectedTags.includes(f) ? <CheckIcon /> : null}
                </div>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group>
          {/* <SelectPrimitive.Separator /> */}
          {/* <SelectPrimitive.Group>
            <SelectPrimitive.Label>Topics</SelectPrimitive.Label>
            {props.topics.map((f, i) => (
              <SelectPrimitive.Item
                key={`${f}-${i}`}
                value={f}
                className={clsx(
                  'relative flex items-center rounded-md px-8 py-2 text-sm font-medium  text-gray-700 focus:bg-gray-100 ',
                  'radix-disabled:opacity-50',
                  'select-none focus:outline-none'
                )}
              >
                <SelectPrimitive.ItemText>{f}</SelectPrimitive.ItemText>
                <div className="absolute left-2 inline-flex items-center">
                  {props.selectedTags.includes(f) ? <CheckIcon /> : null}
                </div>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group> */}
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700 ">
          <ChevronDownIcon />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  )
}

export default Select
